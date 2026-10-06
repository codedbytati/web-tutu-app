import type { AccountRepository } from '../repositories/AccountRepository'

export const getAccounts = (repository: AccountRepository) => repository.getAll()
