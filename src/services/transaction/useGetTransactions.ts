import { useQuery } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import type { RemoteTransaction } from '@tutu-data'
import endpoints from './endpoints'
import { queryKeys } from '../queryKeys'

type TransactionsResponse = {
  result: {
    transactions: RemoteTransaction[]
  }
}

export const transactionsQueryOptions = {
  queryKey: queryKeys.transactions,
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
