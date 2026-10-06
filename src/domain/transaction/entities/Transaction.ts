export type Transaction = {
  id: string
  accountId: string
  category?:
    | 'HOUSE'
    | 'FOOD'
    | 'TRANSPORT'
    | 'EDUCATION'
    | 'HEALTH'
    | 'LEISURE'
    | 'OTHER'
    | 'SALARY'
    | 'INVESTIMENT'
    | 'SAVINGS'
  type: TransactionType
  value: number
  description?: string
  from?: string
  to?: string
  date: string
}

export type TransactionType = 'DEBIT' | 'CREDIT' | 'TRANSFER'

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
