import { QueryClient } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0
    }
  }
})

export const invalidateFinancialQueries = (client: QueryClient) =>
  Promise.all([
    client.invalidateQueries({ queryKey: queryKeys.transactions }),
    client.invalidateQueries({ queryKey: queryKeys.accounts })
  ])
