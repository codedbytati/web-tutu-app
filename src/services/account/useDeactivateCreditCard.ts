import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { deactivateCard } from '@tutu-domain/account/use-cases/DeactivateCard'
import { accountRepository } from '@tutu-infrastructure/account/HttpAccountRepository'

export const useDeactivateCreditCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cardId: string) => deactivateCard(accountRepository, cardId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
  })
}
