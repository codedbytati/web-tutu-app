import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RemoteTransaction } from '@tutu-data'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string
      value: number
      type: RemoteTransaction['type']
      description?: string
      date?: string
      category?: string
      accountId?: string
      from?: string
      to?: string
    }) => {
      const { data } = await api.put<{ result: RemoteTransaction }>(
        endpoints.editTransaction.replace(':id', id),
        updates
      )
      return data.result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
    }
  })
}
