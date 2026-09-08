export type TransactionType = 'DEBIT' | 'CREDIT' | 'TRANSFER'

export type RemoteTransaction = {
  id: string
  accountId: string
  type: TransactionType
  value: number
  description?: string
  from?: string
  to?: string
  date: string
}
