import { useQuery } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'
import type { RemoteAccounts } from '@tutu-data'

export const accountsQueryOptions = {
  queryKey: ['get-accounts'] as const,
  queryFn: async () => {
    const { data } = await api.get<RemoteAccounts>(endpoints.getAccount)
    return data.result
  }
}

export const useGetAccount = () => {
  return useQuery(accountsQueryOptions)
}