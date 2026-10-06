import { Suspense, lazy } from 'react'
import { Text } from '@tutu-ui'
import { Page } from '../../layouts/Page'

const DonutChart = lazy(() =>
  import('./components/DonutChart').then(({ DonutChart }) => ({
    default: DonutChart
  }))
)

export const Analysis = () => {
  return (
    <Page>
      <Page.Header>
        <Text appearance='h3' as='h1' className='font-bold'>
          Análises
        </Text>
      </Page.Header>
      <Page.Body>
        {/* <div className='grid grid-cols-3 gap-3'>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>
              Saldo
            </Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>
              Saldo
            </Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>
              Saldo
            </Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
        </div> */}
        <Suspense
          fallback={
            <div className='flex min-h-64 items-center justify-center'>
              Carregando gráfico...
            </div>
          }
        >
          <DonutChart />
        </Suspense>
      </Page.Body>
    </Page>
  )
}
