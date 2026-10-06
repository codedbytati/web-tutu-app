import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { useGetTransactions } from '@tutu-services/transaction'
import { TRANSACTION_CATEGORIES } from '../../../utils/getTransactionCategory'
import { formatCurrency } from '../../../utils'

export const DonutChart = () => {
  const { data: transactions = [] } = useGetTransactions()
  const currentDate = new Date()
  const categoryTotals = new Map<string, number>()

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date)
    const isCurrentMonth =
      transactionDate.getFullYear() === currentDate.getFullYear() &&
      transactionDate.getMonth() === currentDate.getMonth()

    if (
      Number.isNaN(transactionDate.getTime()) ||
      !isCurrentMonth ||
      transaction.type !== 'DEBIT'
    ) {
      return
    }

    const category = transaction.category ?? 'OTHER'
    categoryTotals.set(
      category,
      (categoryTotals.get(category) ?? 0) + Math.abs(transaction.value)
    )
  })

  const categories = [...categoryTotals.entries()].sort(
    ([, firstTotal], [, secondTotal]) => secondTotal - firstTotal
  )
  const series = categories.map(([, total]) => total)
  const labels = categories.map(
    ([category]) => TRANSACTION_CATEGORIES[category]?.name ?? 'Outros'
  )
  const totalExpenses = series.reduce((total, value) => total + value, 0)

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'sans-serif'
    },
    title: {
      text: 'Despesas por Categoria',
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#151521'
      }
    },
    labels,
    colors: ['#FF6B5B', '#7C65FF', '#60A5FA', '#F59E0B', '#34D399', '#C4B5FD'],
    stroke: {
      show: true,
      colors: ['#FFFFFF'],
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      fontSize: '15px',
      markers: {
        size: 10
      },
      itemMargin: {
        vertical: 6
      },
      onItemClick: {
        toggleDataSeries: false
      },
      formatter: function (seriesName, opts) {
        const value = opts?.w.globals.series[opts.seriesIndex]
        const percentage = totalExpenses > 0
          ? (value / totalExpenses) * 100
          : 0
        return `<div style="display: flex; justify-content: space-between; width: 260px; color: #9CA3AF;">
                  <span>${seriesName}</span>
                  <strong style="color: #111827;">${percentage.toFixed(1)}%</strong>
                </div>`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              color: '#9CA3AF',
              offsetY: -5
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#111827',
              offsetY: 5,
              formatter: (value) => `R$ ${formatCurrency(value)}`
            },
            total: {
              show: true,
              label: 'Total',
              color: '#9CA3AF',
              formatter: () => `R$ ${formatCurrency(totalExpenses)}`
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `R$ ${formatCurrency(val)}`
      }
    }
  }

  return (
    <div className='my-0 p-5 bg-white rounded-2xl border border-border'>
      <Chart options={options} series={series} type='donut' width='100%' />
    </div>
  )
}
