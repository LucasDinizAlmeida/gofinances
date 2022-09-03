import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { Card } from '../../components/Card';
import { TransactionCard } from '../../components/TransactionCard';
import { FlatList } from 'react-native';
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
  LogoutButton
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataKey } from '../register';

import { DataListProps } from '../../utils/types/TransactiosType';

// export interface DataListProps extends TransactionCardProps {
//   id: string
// }


export function Dashboard() {

  const [transactions, setTransactions] = useState<DataListProps[]>([])

  async function calcTotal() {

    const data = await AsyncStorage.getItem(dataKey)
    const transactionsList = data ? JSON.parse(data) : []

    const income = transactionsList.filter((item: DataListProps) => item.type === 'up')
    const outcome = transactionsList.filter((item: DataListProps) => item.type === 'down')

    const positiveTotal = income.reduce(
      (previousValue: Number, item: DataListProps) => Number(previousValue) + Number(item.amount), 0
    )

    const negativeTotal = outcome.reduce(
      (previousValue: Number, item: DataListProps) => Number(previousValue) + Number(item.amount), 0
    )

    const total = positiveTotal - negativeTotal

    console.log({
      positiveTotal,
      negativeTotal,
      total
    })
  }

  async function loadTransactions() {

    const data = await AsyncStorage.getItem(dataKey)
    const transactionsList = data ? JSON.parse(data) : []

    const transactionsFormatted = transactionsList.map((item: DataListProps) => {

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

    setTransactions(transactionsFormatted)
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
    calcTotal()
  }, []))


  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <>
      <Container>
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
            amount='R$
            17.400,00'
            lastTransaction='Última transação dia 13 de abril'
            title='Entradas'
          />
          <Card
            type='down'
            amount='R$
            1.259,00'
            lastTransaction='Última transação dia 13 de abril'
            title='Saídas'
          />
          <Card
            type='total'
            amount='R$
            16.141,00'
            lastTransaction='Última transação dia 13 de abril'
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
        {/* 
        <TransactionsTitle>Listagem</TransactionsTitle>
        <Transactions>
          <Transaction
            title='Desenvolvimento de site'
            amount='R$ 8.000,00'
            category='Freelancer'
            type='up'
            createAt='12/10/2022'
          />
          <Transaction
            title='gasolina'
            amount='R$ -50,00'
            category='moto'
            type='down'
            createAt='12/10/2022'
          />
        </Transactions> */}
      </Container>

    </>
  );
}

