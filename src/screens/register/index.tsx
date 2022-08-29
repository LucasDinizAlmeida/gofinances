import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import {
  Container,
  Header,
  Title,
  Form,
  TransactionsType
} from './styles';

export function Register() {

  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeTransaction(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Input placeholder='Nome' />
        <Input placeholder='Nome' />

        <TransactionsType>
          <TransactionTypeButton
            isActive={transactionType === 'up'}
            title='Income'
            type='up'
            onPress={() => handleTransactionTypeTransaction('up')}
          />
          <TransactionTypeButton
            isActive={transactionType === 'down'}
            title='Outcome'
            type='down'
            onPress={() => handleTransactionTypeTransaction('down')}
          />
        </TransactionsType>


        <Button title='Enviar' style={{ marginTop: 'auto' }} />
      </Form>


    </Container>
  );
}