export type Account = {
  id: string
  bank: string
  nickname: string
  balance: number
  type: 'CURRENT' | 'SAVINGS' | 'INVESTMENT'
  isDeactivate: boolean
}

export type Card = {
  id: string
  bank: string
  nickname: string
  limit: number
  spent: number
  available: number
  isDeactivate: boolean
}

export type CreateAccountInput = {
  bank: string
  nickname: string
  type: Account['type']
  balance: number
}

export type CreateCardInput = {
  bank: string
  nickname: string
  limit: number
}

export type Accounts = {
  account: Account[]
  cards: Card[]
}
