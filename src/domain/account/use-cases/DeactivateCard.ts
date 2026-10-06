import type { AccountRepository } from '../repositories/AccountRepository'

export const deactivateCard = (repository: AccountRepository, id: string) =>
  repository.deactivateCard(id)
