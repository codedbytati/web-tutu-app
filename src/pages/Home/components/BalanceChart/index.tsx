import type { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import Chart from 'react-apexcharts';

interface SeriesData {
  name: string;
  data: number[];
}

export const BalanceChart = () => {
  const [options] = useState<ApexOptions>({
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    tooltip: {
      theme: 'light'
    }
  });

  const [series] = useState<SeriesData[]>([
    {
      name: 'Receitas',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Despesas',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]);

  return (
    <div className="bg-card rounded-2xl p-5 border border-border chart-container">
      <h2 className='font-display font-bold text-sm text-foreground'>Balanço mensal</h2>
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};
