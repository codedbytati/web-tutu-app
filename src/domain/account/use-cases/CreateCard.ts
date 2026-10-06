import type { CreateCardInput } from '../entities/Account'
import type { AccountRepository } from '../repositories/AccountRepository'

export const createCard = (
  repository: AccountRepository,
  input: CreateCardInput
) => repository.createCard(input)
