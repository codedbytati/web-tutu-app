import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import type { RemoteTransaction } from '@tutu-data'
import endpoints from './endpoints'
import { invalidateFinancialQueries } from '../queryClient'

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
        endpoints.createTransaction,
        transaction
      )
      return data.result
    },
    onSuccess: () => invalidateFinancialQueries(queryClient)
  })
}
