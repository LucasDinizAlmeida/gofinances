import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValue } from 'react-hook-form';
import { Modal } from 'react-native';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  TransactionsType
} from './styles';

type FormData = {
  name: string,
  amount: string
}

export function Register() {

  const [transactionType, setTransactionType] = useState('')

  const [isOpenTransactionSelectModal, setIsOpenTransactionSelectModal] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const { control, handleSubmit } = useForm()

  function handleTransactionTypeTransaction(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function HandleOpenTransactionSelectModal() {
    setIsOpenTransactionSelectModal(true)
  }

  function HandleCloseTransactionSelectModal() {
    setIsOpenTransactionSelectModal(false)
  }

  const handleRegister: SubmitHandler<FormData> = (values) => {
    const data = {
      name: values.name,
      amount: values.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <InputForm
          name='name'
          control={control}
          placeholder="Nome"
        />
        <InputForm
          name='amount'
          control={control}
          placeholder="Preço"
        />

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

        <CategorySelectButton
          title={category.name}
          onPress={HandleOpenTransactionSelectModal}
        />

        <Button
          onPress={handleSubmit(handleRegister)}
          title='Enviar'
          style={{ marginTop: 'auto' }}
        />
      </Form>

      <Modal visible={isOpenTransactionSelectModal}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={HandleCloseTransactionSelectModal}

        />
      </Modal>
    </Container>
  );
}