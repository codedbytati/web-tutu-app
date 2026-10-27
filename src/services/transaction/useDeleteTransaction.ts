import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'
import { invalidateFinancialQueries } from '../queryClient'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(endpoints.editTransaction.replace(':id', id))
    },
    onSuccess: () => invalidateFinancialQueries(queryClient)
  })
}
