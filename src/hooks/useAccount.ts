import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createTransaction,
  type CreateTransactionInput
} from '../services/api'

export const accountQueryKey = ['account']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (transaction: CreateTransactionInput) =>
      createTransaction(transaction),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: accountQueryKey })
  })
}
