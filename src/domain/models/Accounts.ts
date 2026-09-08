export type AccountModel = {
  id: string
  bank: string
  nickname: string
  balance: number
  type: 'CURRENT' | 'SAVINGS' | 'INVESTMENT'
  isDeactivate: boolean
}

export type CardModel = {
  id: string
  bank: string
  nickname: string
  limit: number
  spent: number
  available: number
  isDeactivate: boolean
}
