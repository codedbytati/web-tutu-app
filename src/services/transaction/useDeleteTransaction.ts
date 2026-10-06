import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { deleteTransaction } from '@tutu-domain/transaction/use-cases/DeleteTransaction'
import { transactionRepository } from '@tutu-infrastructure/transaction/HttpTransactionRepository'
import type { Transaction } from '@tutu-domain/transaction/entities/Transaction'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(transactionRepository, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions })
      const previous = queryClient.getQueryData<Transaction[]>(
        queryKeys.transactions
      )
      queryClient.setQueryData(
        queryKeys.transactions,
        previous?.filter((transaction) => transaction.id !== id)
      )
      return { previous }
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.transactions, context.previous)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions })
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts })
    }
  })
}
