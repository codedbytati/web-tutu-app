import type { RemoteAccount, RemoteCard } from '@tutu-data'

export type Account = RemoteAccount
export type Card = RemoteCard

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
