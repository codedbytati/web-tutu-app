import { useQuery } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'
import type { RemoteAccounts } from '../../data'

export const useGetAccount = () => {
  return useQuery({
    queryKey: ['get-accounts'],
    queryFn: async () => {
      const { data } = await api.get<RemoteAccounts>(endpoints.getAccount)
      return data.result
    }
  })
}
