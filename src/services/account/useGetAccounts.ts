import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { accountRepository } from '@tutu-infrastructure/account/HttpAccountRepository'
import { getAccounts } from '@tutu-domain/account/use-cases/GetAccounts'

export const accountsQueryOptions = {
  queryKey: queryKeys.accounts,
  queryFn: () => getAccounts(accountRepository),
  staleTime: 60_000,
  gcTime: 10 * 60_000
} as const

export const useGetAccount = () => {
  return useQuery(accountsQueryOptions)
}
