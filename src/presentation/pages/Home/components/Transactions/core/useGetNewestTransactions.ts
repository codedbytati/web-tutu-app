import { useGetTransactions } from '@tutu-services/transaction'
import { getTransactionDescription } from '../../../../utils/transactionPresentation'

export const useGetNewestTransactions = () => {
  const { data, isLoading, isError } = useGetTransactions()

  return {
    transactions: data?.slice(0, 3) || [],
    isLoading,
    isError,
    description: getTransactionDescription
  }
}
