export type AccountType = 'CURRENT' | 'SAVINGS' | 'INVESTIMENT'

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
  INVESTIMENT: {
    label: 'Investimentos',
    color: 'yellow'
  }
}
