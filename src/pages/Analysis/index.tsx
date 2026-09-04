import { Text } from '@tutu-ui'
import { DonutChart } from './components/DonutChart'
import { Page } from '../../layouts/Page'

export const Analysis = () => {
  return (
    <div className='w-1/2'>
      <Text appearance='h3' as='h1' className='font-bold mb-4 mx-5'>Análises</Text>
      <Page>
        <div className='grid grid-cols-3 gap-3'>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>Saldo</Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>Saldo</Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
          <div className='flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 border border-border'>
            <Text appearance='overline' className='text-muted-foreground'>Saldo</Text>
            <Text className='font-bold'>R$24.8K</Text>
            <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
              <div className='size-1.5 bg-positive rounded-full' />
              <p className='text-positive text-[10px] font-semibold'>+8%</p>
            </div>
          </div>
        </div>
        <DonutChart />
      </Page>
    </div>
  )
}