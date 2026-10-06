import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import type { CreateTransactionInput } from '@tutu-domain/transaction/entities/Transaction'
import { createTransaction } from '@tutu-domain/transaction/use-cases/CreateTransaction'
import { transactionRepository } from '@tutu-infrastructure/transaction/HttpTransactionRepository'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (transaction: CreateTransactionInput) =>
      createTransaction(transactionRepository, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions })
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
    }
  })
}
