import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput
} from '../entities/Transaction'

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>
  create(input: CreateTransactionInput): Promise<Transaction>
  update(input: UpdateTransactionInput): Promise<Transaction>
  delete(id: string): Promise<void>
}
