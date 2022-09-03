import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { dataKey } from '../screens/register'
import { DataListProps } from '../utils/types/TransactiosType'

interface TransactionsContextProps {
  transactions: DataListProps[],
  setTransactions: (data: DataListProps[]) => void,

}


const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps)

interface TransactionsContextProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {

  const [transactions, setTransactions] = useState<DataListProps[]>([])

  useEffect(() => {

    async function loadTransactions() {
      const data = await AsyncStorage.getItem(dataKey)

      const storage = data ? JSON.parse(data!) : []

      setTransactions(storage)
    }

    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)