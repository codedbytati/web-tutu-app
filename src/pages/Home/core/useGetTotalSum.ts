import { useGetAccount } from '@tutu-services/account'
import { formatCurrency } from '../../utils'

export const useGetTotalSum = () => {
  const { data } = useGetAccount()

  const balance = data?.account
    .filter((account) => account.type === 'CURRENT')
    .reduce((sum, account) => sum + account.balance, 0)

  return {
    balance: formatCurrency(balance ?? 0)
  }
}
