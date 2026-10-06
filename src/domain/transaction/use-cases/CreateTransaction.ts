import type {
  CreateTransactionInput,
  Transaction
} from '../entities/Transaction'
import type { TransactionRepository } from '../repositories/TransactionRepository'

export const createTransaction = (
  repository: TransactionRepository,
  input: CreateTransactionInput
): Promise<Transaction> => repository.create(input)
