export type AccountType = 'CURRENT' | 'SAVINGS' | 'INVESTMENT'

interface AccountTypeConfig {
  label: string
  color: 'blue' | 'green' | 'yellow'
}

export const ACCOUNT_TYPES: Record<AccountType, AccountTypeConfig> = {
  CURRENT: {
    label: 'Corrente',
    color: 'blue'
  },
  SAVINGS: {
    label: 'Poupança',
    color: 'green'
  },
  INVESTMENT: {
    label: 'Investimentos',
    color: 'yellow'
  }
}
