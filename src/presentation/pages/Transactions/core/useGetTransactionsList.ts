import { useMemo, useState, type ChangeEvent } from 'react'
import { useGetTransactions } from '@tutu-services/transaction'
import {
  getTransactionDescription,
  getTransactionTotals
} from '../../../../domain/transaction/transactionPresentation'

export const useGetTransactionsList = () => {
  const { data: transactions = [], isLoading, isError } = useGetTransactions()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [search, setSearch] = useState('')

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
          getTransactionDescription(transaction)
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      }),
    [filter, search, transactions]
  )

  const { income, expenses } = getTransactionTotals(transactions)

  return {
    income,
    expenses,
    filter,
    isError,
    isLoading,
    transactions: filteredTransactions,
    description: getTransactionDescription,
    onFilterClick: setFilter,
    onSearchProps: {
      value: search,
      onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setSearch(event.target.value)
    },

  }
}
