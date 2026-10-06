import { useGetTransactions } from '@tutu-services/account'
import { formatCurrency } from '../../../../utils'
import {
  getMonthlyTotals,
  getPreviousMonth
} from '../../../../../../domain/analysis/monthlyTotals'

export const useGetAnalysis = () => {
  const { data: transactions = [] } = useGetTransactions()
  const currentDate = new Date()

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
