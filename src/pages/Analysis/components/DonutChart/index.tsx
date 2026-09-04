import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

export const DonutChart = () => {
  const series = [44, 8, 10, 17, 8, 13]

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
    labels: [
      'Alimentação',
      'Streaming',
      'Transporte',
      'Compras',
      'Saúde',
      'Utilidades'
    ],
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
      formatter: function (seriesName, opts) {
        const value = opts?.w.globals.series[opts.seriesIndex]
        return `<div style="display: flex; justify-content: space-between; width: 260px; color: #9CA3AF;">
                  <span>${seriesName}</span>
                  <strong style="color: #111827;">${value}%</strong>
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
              formatter: () => 'R$ 1 mil'
            },
            total: {
              show: true,
              label: 'Total',
              color: '#9CA3AF',
              formatter: () => 'R$ 1 mil'
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`
      }
    }
  }

  return (
    <div className='my-0 p-5 bg-white rounded-2xl border border-border'>
      <Chart options={options} series={series} type='donut' width='100%' />
    </div>
  )
}
