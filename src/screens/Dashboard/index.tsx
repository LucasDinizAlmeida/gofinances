import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler'


import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  ContainerLoading
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataKey } from '../register';

import { DataListProps } from '../../utils/types/TransactiosType';
import { isLoaded } from 'expo-font';
import { useTheme } from 'styled-components';

// export interface DataListProps extends TransactionCardProps {
//   id: string
// }

interface HighlightDataProps {
  amount: string,
  lastTransaction: string
}

interface HighlightData {
  income: HighlightDataProps,
  expense: HighlightDataProps,
  total: HighlightDataProps,
}


export function Dashboard() {

  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(false)

  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'up' | 'down'
  ) {

    const lastTransaction = Math.max.apply(Math, collection
      .filter(item => item.type === type)
      .map(item => new Date(item.date).getTime())
    )

    return Intl.DateTimeFormat('pt-br', {
      day: '2-digit',
      month: 'long'
    }).format(new Date(lastTransaction))

  }



  async function loadTransactions() {

    const data = await AsyncStorage.getItem(dataKey)
    const transactionsList = data ? JSON.parse(data) : []

    let income = 0
    let expense = 0

    const transactionsFormatted = transactionsList.map((item: DataListProps) => {

      if (item.type === 'up') {
        income += Number(item.amount)
      } else {
        expense += Number(item.amount)
      }

      const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return { ...item, amount, date }

    })

    // pegar a data mais recente
    const lastTransactionEntries = getLastTransactionDate(transactionsList, 'up')
    const lastTransactionExpense = getLastTransactionDate(transactionsList, 'down')
    const totalInterval = `01 à ${lastTransactionExpense}`



    setTransactions(transactionsFormatted)
    setHighlightData({
      income: {
        amount: income.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries
      },
      expense: {
        amount: expense.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpense
      },
      total: {
        amount: (income - expense).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoaded(true)
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))


  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <>
      <Container>
        {
          !isLoaded ?
            <ContainerLoading>
              <ActivityIndicator size='large' color={theme.colors.primary} />
            </ContainerLoading>
            :
            <>
              <Header>
                <UserWrapper>
                  <UserInfo>
                    <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/92605557?v=4' }} />
                    <User>
                      <UserGreeting>Olá, </UserGreeting>
                      <UserName>Lucas</UserName>
                    </User>
                  </UserInfo>

                  <GestureHandlerRootView>
                    <LogoutButton>
                      <Icon name="power" />
                    </LogoutButton>
                  </GestureHandlerRootView>


                </UserWrapper>
              </Header>

              <HighlightCards>
                <Card
                  type='up'
                  amount={highlightData.income.amount}
                  lastTransaction={`Última entrada dia ${highlightData.income.lastTransaction}`}
                  title='Entradas'
                />
                <Card
                  type='down'
                  amount={highlightData.expense.amount}
                  lastTransaction={`Última saída dia ${highlightData.expense.lastTransaction}`}
                  title='Saídas'
                />
                <Card
                  type='total'
                  amount={highlightData.total.amount}
                  lastTransaction={highlightData.total.lastTransaction}
                  title='Total'
                />

              </HighlightCards>

              <Transactions>
                <Title>Listagem</Title>

                <TransactionsList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <TransactionCard data={item} />}
                />
              </Transactions>

            </>
        }
      </Container>

    </>
  );
}

