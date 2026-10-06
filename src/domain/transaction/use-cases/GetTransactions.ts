import type { TransactionRepository } from '../repositories/TransactionRepository'

export const getTransactions = (repository: TransactionRepository) =>
  repository.getAll()
