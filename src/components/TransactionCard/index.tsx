import React from 'react';
import { categories } from '../../utils/categories';
import { TransactionCardProps } from '../../utils/types/TransactiosType';
import {
  Container,
  Header,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  Date,
  CategoryName
} from './styles';

// interface Category {
//   icon: string,
//   name: string
// }

// export interface TransactionCardProps {
//   title: string,
//   amount: string,
//   category: Category,
//   date: string,
//   type: string
// }

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {

  // const [category] = categories.filter(item => item.key === data.category.key)

  return (
    <Container>
      <Header>
        <Title>{data.title}</Title>
        <Amount type={data.type}>
          {data.type === 'down' && '- '}
          {data.amount}
        </Amount>
      </Header>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.title}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>


    </Container>
  );
}