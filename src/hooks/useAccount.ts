import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAccount, createCard, createTransaction, getAccount, type CreateAccountInput, type CreateCardInput, type CreateTransactionInput } from '../services/api'

export const accountQueryKey = ['account']

export const useAccount = () => {
  return useQuery({
    queryKey: accountQueryKey,
    queryFn: getAccount,
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (transaction: CreateTransactionInput) => createTransaction(transaction),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accountQueryKey }),
  })
}

export const useCreateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (card: CreateCardInput) => createCard(card),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accountQueryKey }),
  })
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (account: CreateAccountInput) => createAccount(account),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: accountQueryKey }),
  })
}
