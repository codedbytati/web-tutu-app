import type { RemoteAccount, RemoteAccounts, RemoteCard } from '@tutu-data'
import { api } from '@tutu-services/api'
import endpoints from '@tutu-services/account/endpoints'
import type {
  Accounts,
  CreateAccountInput,
  CreateCardInput
} from '@tutu-domain/account/entities/Account'
import type { AccountRepository } from '@tutu-domain/account/repositories/AccountRepository'

export class HttpAccountRepository implements AccountRepository {
  async getAll(): Promise<Accounts> {
    const { data } = await api.get<RemoteAccounts>(endpoints.getAccount)
    return data.result
  }

  async create(input: CreateAccountInput) {
    const { data } = await api.post<{ result: RemoteAccount }>(
      endpoints.getAccount,
      input
    )
    return data.result
  }

  async createCard(input: CreateCardInput) {
    const { data } = await api.post<{ result: RemoteCard }>(
      endpoints.createCard,
      input
    )
    return data.result
  }

  async deactivate(id: string) {
    await api.patch(endpoints.deactivateAccount.replace(':accountId', id))
  }

  async deactivateCard(id: string) {
    await api.patch(endpoints.deactivateCard.replace(':cardId', id))
  }
}

export const accountRepository = new HttpAccountRepository()
