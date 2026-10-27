import { useQuery } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'
import type { RemoteAccounts } from '@tutu-data'
import { queryKeys } from '../queryKeys'

export const accountsQueryOptions = {
  queryKey: queryKeys.accounts,
  queryFn: async () => {
    const { data } = await api.get<RemoteAccounts>(endpoints.getAccount)
    return data.result
  }
}

export const useGetAccount = () => {
  return useQuery(accountsQueryOptions)
}
