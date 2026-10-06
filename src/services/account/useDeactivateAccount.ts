import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { deactivateAccount } from '@tutu-domain/account/use-cases/DeactivateAccount'
import { accountRepository } from '@tutu-infrastructure/account/HttpAccountRepository'

export const useDeactivateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (accountId: string) =>
      deactivateAccount(accountRepository, accountId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
  })
}
