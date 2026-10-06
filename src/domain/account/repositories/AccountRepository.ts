import type {
  Accounts,
  CreateAccountInput,
  CreateCardInput
} from '../entities/Account'

export interface AccountRepository {
  getAll(): Promise<Accounts>
  create(input: CreateAccountInput): Promise<Accounts['account'][number]>
  createCard(input: CreateCardInput): Promise<Accounts['cards'][number]>
  deactivate(id: string): Promise<void>
  deactivateCard(id: string): Promise<void>
}
