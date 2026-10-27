import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useGetTransactions } from '@tutu-services/transaction'
import type { RemoteTransaction } from '@tutu-data'

interface SeriesData {
  name: string
  data: number[]
}

export const BalanceChart = () => {
  const { data: transactions = [] } = useGetTransactions()
  const monthlyTotals = new Map<string, { label: string; income: number; expenses: number }>()

  transactions.forEach((transaction: RemoteTransaction) => {
    const date = new Date(transaction.date)
    if (Number.isNaN(date.getTime()) || transaction.type === 'TRANSFER') return

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`
    const month = monthlyTotals.get(monthKey) ?? {
      label: date.toLocaleDateString('pt-BR', { month: 'short' }),
      income: 0,
      expenses: 0
    }
    const value = Math.abs(transaction.value)

    if (transaction.type === 'CREDIT') {
      month.income += value
    } else {
      month.expenses += value
    }

    monthlyTotals.set(monthKey, month)
  })

  const months = [...monthlyTotals.entries()].sort(([first], [second]) =>
    first.localeCompare(second)
  )

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
      fontSize: '10px',
      labels: {
        colors: '#A09DB4'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#37D6A3', '#FD6251'],
    xaxis: {
      categories: months.map(([, month]) => month.label)
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) =>
          value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
      }
    }
  }

  const series: SeriesData[] = [
    {
      name: 'Receitas',
      data: months.map(([, month]) => month.income)
    },
    {
      name: 'Despesas',
      data: months.map(([, month]) => month.expenses)
    }
  ]

  return (
    <div className='bg-card rounded-2xl p-5 border border-border chart-container'>
      <h2 className='font-display font-bold text-sm text-foreground'>
        Balanço anual
      </h2>
      <Chart options={options} series={series} type='area' height={350} />
    </div>
  )
}
