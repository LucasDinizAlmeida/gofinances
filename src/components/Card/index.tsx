

import React from 'react';
import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

interface Props {
  type: 'open' | 'closed'
  amount: string,
  lastTransaction: string
}

export function Card({ amount, lastTransaction, type }: Props) {
  return (
    <Container>
      <Header>
        <Title>{type === 'open' ? 'Entrada' : 'Saída'}</Title>
        <Icon name="power" />
      </Header>

      <Footer>
        <Amount>{amount}</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}