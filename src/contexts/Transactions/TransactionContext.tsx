import { createContext, useContext } from 'react'
import { Transaction } from './TransactionProvider'

interface CreateTransactionData {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}
interface TransactionContextType {
  transactions: Transaction[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export const useTransactions = () => useContext(TransactionsContext)
