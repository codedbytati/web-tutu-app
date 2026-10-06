import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import type { CreateAccountInput } from '@tutu-domain/account/entities/Account'
import { createAccount } from '@tutu-domain/account/use-cases/CreateAccount'
import { accountRepository } from '@tutu-infrastructure/account/HttpAccountRepository'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (account: CreateAccountInput) =>
      createAccount(accountRepository, account),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
  })
}
