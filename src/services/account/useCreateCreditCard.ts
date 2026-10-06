import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import type { CreateCardInput } from '@tutu-domain/account/entities/Account'
import { createCard } from '@tutu-domain/account/use-cases/CreateCard'
import { accountRepository } from '@tutu-infrastructure/account/HttpAccountRepository'

export const useCreateCreditCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (card: CreateCardInput) => createCard(accountRepository, card),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
  })
}
