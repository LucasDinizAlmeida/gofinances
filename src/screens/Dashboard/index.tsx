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

import { DataListProps } from '../../utils/types/TransactiosType';
import { isLoaded } from 'expo-font';

import { useTheme } from 'styled-components';
import { useAuthContext } from '../../hooks/AuthContext';

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
  const { signOut, user } = useAuthContext()

  const dataKey = `@gofinances:transactions_user:${user.id}`

  const [isLoaded, setIsLoaded] = useState(false)

  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'up' | 'down'
  ) {

    if (collection.length === 0) { //dá erro se o array vier vazio, se não existir transação.
      return ''
    }

    const lastTransaction = Math.max.apply(Math, collection
      .filter(item => item.type === type)
      .map(item => new Date(item.date).getTime()))

    // return Intl.DateTimeFormat('pt-br', {
    //   day: '2-digit',
    //   month: 'long'
    // }).format(new Date(lastTransaction))

    return new Date(lastTransaction).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long'
    })
  }



  async function loadTransactions() {

    try {

      const data = await AsyncStorage.getItem(dataKey)
      const transactionsList = data ? JSON.parse(data!) : []

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
      const transactionsEntries = transactionsList.filter((item: DataListProps) => item.type === 'up')
      const transactionsExpense = transactionsList.filter((item: DataListProps) => item.type === 'down')

      const lastTransactionEntries = getLastTransactionDate(transactionsEntries, 'up')
      const lastTransactionExpense = getLastTransactionDate(transactionsExpense, 'down')
      const totalInterval = lastTransactionExpense === '' ? 'Nenhuma transação ainda' : `01 à ${lastTransactionExpense}`



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

    } catch (error) {
      console.log(error)
    }
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
                    <Photo source={{ uri: user.picture }} />
                    <User>
                      <UserGreeting>Olá, </UserGreeting>
                      <UserName>{user.given_name}</UserName>
                    </User>
                  </UserInfo>

                  <GestureHandlerRootView>
                    <LogoutButton onPress={signOut}>
                      <Icon name="power" />
                    </LogoutButton>
                  </GestureHandlerRootView>


                </UserWrapper>
              </Header>

              <HighlightCards>
                <Card
                  type='up'
                  amount={highlightData.income.amount}
                  lastTransaction={
                    highlightData.income.lastTransaction === '' ?
                      'Nenhuma transação ainda'
                      :
                      `Última entrada dia ${highlightData.income.lastTransaction}`
                  }
                  title='Entradas'
                />
                <Card
                  type='down'
                  amount={highlightData.expense.amount}
                  lastTransaction={
                    highlightData.expense.lastTransaction === '' ?
                      'Nenhuma transação ainda'
                      :
                      `Última saída dia ${highlightData.expense.lastTransaction}`
                  }
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

