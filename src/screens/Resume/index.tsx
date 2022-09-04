import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title,
  Body,
  MounthContainer,
  Arrow,
  MounthTitle,
  CardCategoryList
} from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Body>
        <MounthContainer>
          <Arrow name="left" />
          <MounthTitle>maio, 2022</MounthTitle>
          <Arrow name="right" />
        </MounthContainer>

        <CardCategoryList>
          <HistoryCard
            amount='R$1.200,00'
            color='red'
            title='Aluguel'
          />
          <HistoryCard
            amount='R$1.200,00'
            color='red'
            title='Aluguel'
          />
          <HistoryCard
            amount='R$1.200,00'
            color='red'
            title='Aluguel'
          />
        </CardCategoryList>

      </Body>

    </Container>
  );
}