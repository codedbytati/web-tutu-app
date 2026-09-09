import { useGetTransactions } from '@tutu-services/transaction'
import type { RemoteTransaction } from '../../../../../data'
import { formatCurrency } from '../../../../utils'

export const useGetAnalysis = () => {
  const { data: transactions = [] } = useGetTransactions()
  const currentDate = new Date()

  type MonthlyTotals = {
    income: number
    expenses: number
  }

  const getMonthKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

  const getMonthlyTotals = (transactions: RemoteTransaction[], date: Date) => {
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

  const getPreviousMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() - 1, 1)

  const getComparison = (
    current: number,
    previous: number,
    isExpense = false
  ) => {
    if (previous === 0) {
      return { label: 'Sem histórico', color: 'gray' as const }
    }

    const percentage = ((current - previous) / previous) * 100
    const isPositive = isExpense ? percentage <= 0 : percentage >= 0
    const signal = percentage > 0 ? '+' : ''

    return {
      label: `${signal}${percentage.toFixed(0)}% vs mês anterior`,
      color: isPositive ? ('green' as const) : ('red' as const)
    }
  }

  const previousDate = getPreviousMonth(currentDate)
  const currentTotals = getMonthlyTotals(transactions, currentDate)
  const previousTotals = getMonthlyTotals(transactions, previousDate)
  const incomeComparison = getComparison(
    currentTotals.income,
    previousTotals.income
  )
  const expensesComparison = getComparison(
    currentTotals.expenses,
    previousTotals.expenses,
    true
  )

  return {
    totalIncome: formatCurrency(currentTotals.income),
    onBadgeIncome: {
      label: incomeComparison.label,
      color: incomeComparison.color
    },
    totalExpense: formatCurrency(currentTotals.expenses),
    onBagdeExpense: {
      label: expensesComparison.label,
      color: expensesComparison.color
    }
  }
}
