import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  Content,
  ChartContainer,
  ContainerLoading
} from './styles';

import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { VictoryPie } from 'victory-native'

import { categories } from '../../utils/categories'
import { DataListProps } from '../../utils/types/TransactiosType';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useAuthContext } from '../../hooks/AuthContext';


interface TransactionByCategoryProps {
  title: string,
  categoryKey: string,
  amount: string
}

type TotalByCategoryProps = {
  key: string,
  name: string,
  total: number,
  percent: string,
  totalFormatted: string,
  color: string
}

export function Resume() {

  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([])

  const { user } = useAuthContext()
  const dataKey = `@gofinances:transactions_user:${user.id}`

  const [isLoaded, setIsLoaded] = useState(false)

  const [dateSelected, setDateSelected] = useState(new Date())

  const theme = useTheme()



  function handleDateChange(action: 'prev' | 'next') {
    if (action === 'next') {
      setDateSelected(addMonths(dateSelected, 1))
    } else {
      setDateSelected(subMonths(dateSelected, 1))
    }
  }

  async function loadTransactions() {
    try {
      setIsLoaded(true)

      const data = await AsyncStorage.getItem(dataKey)
      const transactions = data ? JSON.parse(data) : []

      // dataFormatted(transactions)

      const transactionsExpense = transactions.filter((item: DataListProps) =>
        item.type === 'down' &&
        new Date(item.date).getMonth() === dateSelected.getMonth() &&
        new Date(item.date).getFullYear() === dateSelected.getFullYear()

      )

      const expenseTotal = transactionsExpense.reduce((accumulator: number, item: DataListProps) => {
        return accumulator += Number(item.amount)
      }, 0)

      const totalByCategory: TotalByCategoryProps[] = []

      categories.forEach(category => {

        let categorySum = 0

        transactionsExpense.forEach((item: DataListProps) => {
          if (item.category.key === category.key) {
            categorySum += Number(item.amount)
          }
        })

        if (categorySum > 0) {

          const totalFormatted = categorySum.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })

          const percent = `${(categorySum / expenseTotal * 100).toFixed(0)}%`

          totalByCategory.push({
            key: category.key,
            name: category.name,
            total: categorySum,
            totalFormatted,
            percent,
            color: category.color
          })
        }

      })

      setTotalByCategories(totalByCategory)
      setIsLoaded(false)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, [dateSelected]))

  // useEffect(() => {
  //   // console.log(useBottomTabBarHeight())
  //   loadTransactions()
  // }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoaded ?
          <ContainerLoading>
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </ContainerLoading>
          :
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24
            }}
          >

            <MonthSelect>
              <GestureHandlerRootView>
                <MonthSelectButton
                  // onPress={() => handleDateChange('prev')}
                  onPress={() => handleDateChange('prev')}
                >
                  <MonthSelectIcon name="left" />
                </MonthSelectButton>
              </GestureHandlerRootView>

              {/* <Month>{format(dateSelected, 'MMMM, yyyy', { locale: ptBR })}</Month> */}
              <Month>
                {
                  format(dateSelected, 'MMMM, yyyy', {
                    locale: ptBR
                  })
                }
              </Month>

              <GestureHandlerRootView>
                <MonthSelectButton
                  // onPress={() => handleDateChange('next')}
                  onPress={() => handleDateChange('next')}
                >
                  <MonthSelectIcon name="right" />
                </MonthSelectButton>
              </GestureHandlerRootView>
            </MonthSelect>


            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                x="percent"
                y="total"
                style={{
                  labels: { fontWeight: 'bold', fontSize: RFValue(18) }
                }}
                labelRadius={50}
              />
            </ChartContainer>



            {
              totalByCategories.map(category => {

                return (
                  <HistoryCard
                    key={category.key}
                    title={category.name}
                    amount={category.totalFormatted}
                    color={category.color}
                  />
                )
              })
            }

          </Content>
      }


    </Container>
  );
}