import type { RemoteTransaction } from '@tutu-data'
import { api } from '@tutu-services/api'
import endpoints from '@tutu-services/transaction/endpoints'
import type {
  CreateTransactionInput,
  UpdateTransactionInput
} from '@tutu-domain/transaction/entities/Transaction'
import type { TransactionRepository } from '@tutu-domain/transaction/repositories/TransactionRepository'

type TransactionsResponse = {
  result: {
    transactions: RemoteTransaction[]
  }
}

export class HttpTransactionRepository implements TransactionRepository {
  async getAll() {
    const { data } = await api.get<TransactionsResponse>(
      endpoints.getTransactions
    )
    return data.result.transactions
  }

  async create(input: CreateTransactionInput) {
    const { data } = await api.post<{ result: RemoteTransaction }>(
      endpoints.getTransactions,
      input
    )
    return data.result
  }

  async update({ id, ...updates }: UpdateTransactionInput) {
    const { data } = await api.put<{ result: RemoteTransaction }>(
      endpoints.editTransaction.replace(':id', id),
      updates
    )
    return data.result
  }

  async delete(id: string) {
    await api.delete(endpoints.editTransaction.replace(':id', id))
  }
}

export const transactionRepository = new HttpTransactionRepository()
