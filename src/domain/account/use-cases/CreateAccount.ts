import type { CreateAccountInput } from '../entities/Account'
import type { AccountRepository } from '../repositories/AccountRepository'

export const createAccount = (
  repository: AccountRepository,
  input: CreateAccountInput
) => repository.create(input)
