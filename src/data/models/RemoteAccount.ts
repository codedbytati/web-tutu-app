export type RemoteAccounts = {
  message: string
  result: {
    account: RemoteAccount[]
    cards: RemoteCard[]
  }
}

export type RemoteAccount = {
  id: string
  bank: string
  nickname: string
  balance: number
  type: 'CURRENT' | 'SAVINGS' | 'INVESTMENT'
  isDeactivate: boolean
}

export type RemoteCard = {
  id: string
  bank: string
  nickname: string
  limit: number
  spent: number
  available: number
  isDeactivate: boolean
}
