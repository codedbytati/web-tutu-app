import type {
  Transaction,
  UpdateTransactionInput
} from '../entities/Transaction'
import type { TransactionRepository } from '../repositories/TransactionRepository'

export const updateTransaction = (
  repository: TransactionRepository,
  input: UpdateTransactionInput
): Promise<Transaction> => repository.update(input)
