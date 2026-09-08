import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'
import type { RemoteTransaction } from '../../data'
import endpoints from './endpoints'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (transaction: {
      accountId?: string
      sourceId?: string
      destinationId?: string
      value: number
      type: 'DEBIT' | 'CREDIT' | 'TRANSFER'
      description?: string
      from?: string
      to?: string
      category?: string
      date?: string
    }) => {
      const { data } = await api.post<{ result: RemoteTransaction }>(
        endpoints.getTransactions,
        transaction
      )
      return data.result
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-transactions'] })
  })
}
