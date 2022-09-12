import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import uuid from 'react-native-uuid';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
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
import { useNavigation } from '@react-navigation/native';
import { DataListProps } from '../../utils/types/TransactiosType';
import { useAuthContext } from '../../hooks/AuthContext';

interface FormData {
  [name: string]: string;
}


const schema = yup.object({
  name: yup
    .string()
    .required('Nome obrigatório'),
  amount: yup
    .number()
    .typeError('Preço obrigatório.')
    .positive('Apenas valor positivo.')
    .required('Informe o valor.')
})

export function Register() {

  const [transactionType, setTransactionType] = useState('')

  const { user } = useAuthContext()
  const dataKey = `@gofinances:transactions_user:${user.id}`

  const [isOpenTransactionSelectModal, setIsOpenTransactionSelectModal] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: ''
  })

  const navigator = useNavigation()

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema)
  })
  const { errors } = formState


  function handleTransactionTypeTransaction(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function HandleOpenTransactionSelectModal() {
    setIsOpenTransactionSelectModal(true)
  }

  function HandleCloseTransactionSelectModal() {
    setIsOpenTransactionSelectModal(false)
  }

  const handleRegister: SubmitHandler<FormData> = async (values) => {

    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação.')
    if (category.key === 'category')
      return Alert.alert('Selecione uma categoria.')

    const newTransaction = {
      id: String(uuid.v4()),
      title: values.name,
      category: {
        key: category.key,
        icon: category.icon
      },
      amount: values.amount,
      type: transactionType,
      date: new Date()
    }

    const data = await AsyncStorage.getItem(dataKey)
    const dataObject = JSON.parse(data!)
    const transactions: DataListProps[] = dataObject ? dataObject : []

    //Zerar os campos e redirecionar para a Dashboard

    setCategory({
      key: 'category',
      name: 'Categoria',
      icon: ''
    })
    setTransactionType('')
    reset()

    navigator.navigate('Listagem')



    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify([newTransaction, ...transactions]))
    } catch (error) {
      console.log(error)
      Alert.alert('Erro na hora de cadastrar a transação.')
    }
  }

  useEffect(() => {
    async function loadTransactions() {
      const transactions = await AsyncStorage.getItem(dataKey)
    }

    loadTransactions()

    // async function removeAll() {
    //   await AsyncStorage.removeItem(dataKey)
    // }

    // removeAll()


  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <InputForm
            name='name'
            control={control}
            placeholder="Nome"
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors && errors.name?.message}
          />
          <InputForm
            name='amount'
            control={control}
            placeholder="Preço"
            keyboardType='numeric'
            error={errors && errors.amount?.message}
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
    </TouchableWithoutFeedback>
  );
}