import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

export const Analysis = () => {
  return (
    <div className='w-full flex gap-3'>
      <div className='w-1/2 flex flex-col items-start rounded-2xl p-4 border border-border bg-card'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-muted-foreground uppercase text-xs font-display font-semibold'>Receitas</p>
          <div className='bg-positive/15 rounded-full p-2'>
            <TrendingUpIcon size={20} className='text-positive' />
          </div>
        </div>
        <p className='font-display font-bold text-xl text-foreground pt-2'>R$8.500,00</p>
        <div className='flex items-center gap-1 bg-positive/15 mt-1.5 px-2 rounded-lg'>
          <div className='bg-positive size-1.5 rounded-full'></div>
          <p className='text-positive font-semibold text-xs py-1 px-2'>+12% vs Jun</p>
        </div>
      </div>
      <div className='w-1/2 flex flex-col items-start rounded-2xl p-4 border border-border bg-card'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-muted-foreground uppercase text-xs font-display font-semibold'>Despesas</p>
          <div className='bg-negative/15 rounded-full p-2'>
            <TrendingDownIcon size={20} className='text-negative' />
          </div>
        </div>
        <p className='font-display font-bold text-xl text-foreground pt-2'>R$8.500,00</p>
        <div className='flex items-center gap-1 bg-negative/15 mt-1.5 px-2 rounded-lg'>
          <div className='bg-negative size-1.5 rounded-full'></div>
          <p className='text-negative font-semibold text-xs py-1 px-2'>-10% vs Jun</p>
        </div>
      </div>
    </div>
  )
}