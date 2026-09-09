export type TransactionType = 'DEBIT' | 'CREDIT' | 'TRANSFER'

export type RemoteTransaction = {
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
