import type { AccountRepository } from '../repositories/AccountRepository'

export const deactivateAccount = (repository: AccountRepository, id: string) =>
  repository.deactivate(id)
