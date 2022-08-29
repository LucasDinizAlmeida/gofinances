import React from 'react';
import { Card } from '../../components/Card';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { FlatList } from 'react-native';

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
  TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string
}


export function Dashboard() {

  const data: DataListProps[] = [
    {
      id: '1',
      title: 'Desenvolvimento de site',
      amount: 'R$ 8.000,00',
      category: {
        name: 'Freelancer',
        icon: 'dollar-sign'
      },
      type: 'up',
      date: '12/10/2022',
    },
    {
      id: '2',
      title: 'gasolina',
      amount: 'R$ 50,00',
      category: {
        name: 'moto',
        icon: 'coffee'
      },
      type: 'down',
      date: '12/10/2022',
    },
    {
      id: '3',
      title: 'gasolina',
      amount: 'R$ 50,00',
      category: {
        name: 'moto',
        icon: 'shopping-bag'
      },
      type: 'down',
      date: '12/10/2022',
    }
  ]

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

            <Icon name="power" />
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
            data={data}
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

