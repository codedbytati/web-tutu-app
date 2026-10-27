import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(endpoints.editTransaction.replace(':id', id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
    }
  })
}
