import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'

export const useDeactivateCreditCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (cardId: string) => {
      await api.patch(endpoints.deactivateCard.replace(':cardId', cardId))
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
  })
}
