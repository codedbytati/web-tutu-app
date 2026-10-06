import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import type { UpdateTransactionInput } from '@tutu-domain/transaction/entities/Transaction'
import { updateTransaction } from '@tutu-domain/transaction/use-cases/UpdateTransaction'
import { transactionRepository } from '@tutu-infrastructure/transaction/HttpTransactionRepository'
import type { Transaction } from '@tutu-domain/transaction/entities/Transaction'

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateTransactionInput) =>
      updateTransaction(transactionRepository, input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions })
      const previous = queryClient.getQueryData<Transaction[]>(
        queryKeys.transactions
      )
      queryClient.setQueryData(
        queryKeys.transactions,
        previous?.map((transaction) =>
          transaction.id === input.id
            ? { ...transaction, ...input }
            : transaction
        )
      )
      return { previous }
    },
    onError: (_error, _input, context) => {
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
