import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { transactionRepository } from '@tutu-infrastructure/transaction/HttpTransactionRepository'
import { getTransactions } from '@tutu-domain/transaction/use-cases/GetTransactions'

export const transactionsQueryOptions = {
  queryKey: queryKeys.transactions,
  queryFn: () => getTransactions(transactionRepository),
  staleTime: 15_000,
  gcTime: 5 * 60_000
} as const

export const useGetTransactions = () => {
  return useQuery(transactionsQueryOptions)
}
