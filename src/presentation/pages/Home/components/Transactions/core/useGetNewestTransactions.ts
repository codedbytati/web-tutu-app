import { useGetTransactions } from '@tutu-services/account'
import type { RemoteTransaction } from '@tutu-data'

export const useGetNewestTransactions = () => {
  const { data, isLoading, isError } = useGetTransactions()

    const transactionDescription = (transaction: RemoteTransaction) => {
      if (transaction.description) return transaction.description
      if (transaction.type === 'TRANSFER')
        return `${transaction.from || 'Origem'} para ${transaction.to || 'Destino'}`
      return transaction.type === 'CREDIT'
        ? transaction.from || transaction.to || 'Entrada'
        : transaction.to || transaction.from || 'Saída'
    }
  
  return {
    transactions: data?.slice(0, 5) || [],
    isLoading,
    isError,
    description: transactionDescription
  }
}