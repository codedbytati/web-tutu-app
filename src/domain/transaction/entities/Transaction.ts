import type { RemoteTransaction, TransactionType } from '@tutu-data'

export type Transaction = RemoteTransaction
export type { TransactionType }

export type CreateTransactionInput = {
  accountId?: string
  sourceId?: string
  destinationId?: string
  value: number
  type: TransactionType
  description?: string
  from?: string
  to?: string
  category?: string
  date?: string
}

export type UpdateTransactionInput = Omit<CreateTransactionInput, 'sourceId' | 'destinationId'> & {
  id: string
}
