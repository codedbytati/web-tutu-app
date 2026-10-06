import type { TransactionRepository } from '../repositories/TransactionRepository'

export const deleteTransaction = (
  repository: TransactionRepository,
  id: string
): Promise<void> => repository.delete(id)
