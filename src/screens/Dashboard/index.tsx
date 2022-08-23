import React from 'react';
import { Card } from '../../components/Card';


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
  HighlightCards
} from './styles';


export function Dashboard() {
  return (
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
        <Card amount='R$ 17.400,00' lastTransaction='Última transação dia 13 de abril' type='open' />
        <Card amount='R$ 17.400,00' lastTransaction='Última transação dia 13 de abril' type='open' />
        <Card amount='R$ 17.400,00' lastTransaction='Última transação dia 13 de abril' type='open' />

      </HighlightCards>
    </Container>
  );
}

