import { useQuery } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import type { RemoteTransaction } from '@tutu-data'
import endpoints from './endpoints'

type TransactionsResponse = {
  result: {
    transactions: RemoteTransaction[]
  }
}

export const transactionsQueryOptions = {
  queryKey: ['get-transactions'] as const,
  queryFn: async () => {
    const { data } = await api.get<TransactionsResponse>(
      endpoints.getTransactions
    )
    return data.result.transactions
  }
}

export const useGetTransactions = () => {
  return useQuery(transactionsQueryOptions)
}
