import type { Transaction } from '@tutu-domain/transaction/entities/Transaction'

export type MonthlyTotals = {
  income: number
  expenses: number
}

const getMonthKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

export const getMonthlyTotals = (
  transactions: Transaction[],
  date: Date
): MonthlyTotals => {
  const monthKey = getMonthKey(date)

  return transactions.reduce<MonthlyTotals>(
    (totals, transaction) => {
      const transactionDate = new Date(transaction.date)
      if (
        Number.isNaN(transactionDate.getTime()) ||
        getMonthKey(transactionDate) !== monthKey ||
        transaction.type === 'TRANSFER'
      ) {
        return totals
      }

      if (transaction.type === 'CREDIT') {
        totals.income += Math.abs(transaction.value)
      } else {
        totals.expenses += Math.abs(transaction.value)
      }

      return totals
    },
    { income: 0, expenses: 0 }
  )
}

export const getPreviousMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1)
