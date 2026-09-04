import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import type { RemoteCard } from '../../data/models/RemoteAccount'
import endpoints from './endpoints'

export const useCreateCreditCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (card: {
      bank: string
      nickname: string
      limit: number
    }) => {
      const { data } = await api.post<{ result: RemoteCard }>(
        endpoints.createCard,
        card
      )
      return data.result
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
  })
}
