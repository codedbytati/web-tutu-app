import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import type { RemoteTransaction } from '../../data'
import endpoints from './endpoints'

type TransactionsResponse = {
  result: {
    transactions: RemoteTransaction[]
  }
}

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ['get-transactions'],
    queryFn: async () => {
      const { data } = await api.get<TransactionsResponse>(
        endpoints.getTransactions
      )
      return data.result.transactions
    }
  })
}
