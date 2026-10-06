import type { RemoteTransaction } from '@tutu-data'

export const getTransactionDescription = (
  transaction: RemoteTransaction
) => {
  if (transaction.description) return transaction.description
  if (transaction.type === 'TRANSFER') {
    return `${transaction.from || 'Origem'} para ${transaction.to || 'Destino'}`
  }

  return transaction.type === 'CREDIT'
    ? transaction.from || transaction.to || 'Entrada'
    : transaction.to || transaction.from || 'Saída'
}

export const getTransactionTotals = (transactions: RemoteTransaction[]) => ({
  income: transactions
    .filter(({ type }) => type === 'CREDIT')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0),
  expenses: transactions
    .filter(({ type }) => type === 'DEBIT')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0)
})
