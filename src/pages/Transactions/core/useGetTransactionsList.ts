import { useMemo, useState, type ChangeEvent } from 'react'
import { useGetTransactions } from '@tutu-services/transaction'
import type { RemoteTransaction } from '@tutu-data'

export const useGetTransactionsList = () => {
  const { data: transactions = [], isLoading, isError } = useGetTransactions()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [search, setSearch] = useState('')

  const transactionDescription = (transaction: RemoteTransaction) => {
    if (transaction.description) return transaction.description
    if (transaction.type === 'TRANSFER')
      return `${transaction.from || 'Origem'} para ${transaction.to || 'Destino'}`
    return transaction.type === 'CREDIT'
      ? transaction.from || transaction.to || 'Entrada'
      : transaction.to || transaction.from || 'Saída'
  }

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesFilter =
          filter === 'all' ||
          (filter === 'income'
            ? transaction.type === 'CREDIT'
            : transaction.type === 'DEBIT')
        return (
          matchesFilter &&
          transactionDescription(transaction)
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      }),
    [filter, search, transactions]
  )

  const income = transactions
    .filter(({ type }) => type === 'CREDIT')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0)
  const expenses = transactions
    .filter(({ type }) => type === 'DEBIT')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0)

  return {
    income,
    expenses,
    filter,
    isError,
    isLoading,
    transactions: filteredTransactions,
    description: transactionDescription,
    onFilterClick: setFilter,
    onSearchProps: {
      value: search,
      onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setSearch(event.target.value)
    },

  }
}
