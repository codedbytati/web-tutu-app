// src/services/api.ts
import axios from 'axios'
import { auth } from '../services/firebase'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export type TransactionType = 'Debit' | 'Credit' | 'Transfer'

export interface Transaction {
  id: string
  accountId: string
  type: TransactionType
  value: number
  from?: string
  to?: string
  date: string
}

export interface CreateTransactionInput {
  accountId: string
  value: number
  type: TransactionType
  from?: string
  to?: string
}

export const createTransaction = async (
  transaction: CreateTransactionInput
) => {
  const { data } = await api.post<{ result: Transaction }>(
    '/account/transaction',
    transaction
  )
  return data.result
}

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser

  if (currentUser) {
    const token = await currentUser.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
