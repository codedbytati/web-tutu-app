import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import type { RemoteAccount } from '@tutu-data'
import endpoints from './endpoints'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (account: {
      bank: string
      nickname: string
      type: 'CURRENT' | 'SAVINGS' | 'INVESTMENT'
      balance: number
    }) => {
      const { data } = await api.post<{ result: RemoteAccount }>(
        endpoints.getAccount,
        account
      )
      return data.result
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
  })
}