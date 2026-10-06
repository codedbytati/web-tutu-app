export type TransactionModel = {
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
  type: 'DEBIT' | 'CREDIT' | 'TRANSFER'
  value: number
  description?: string
  from?: string
  to?: string
  date: string
}
