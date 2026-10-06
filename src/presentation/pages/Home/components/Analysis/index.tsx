import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Badge } from '@tutu-ui'
import { useGetAnalysis } from './core/useGetAnalysis'

export const Analysis = () => {
  const { totalIncome, onBadgeIncome, totalExpense, onBagdeExpense } = useGetAnalysis()

  return (
    <div className='w-full flex gap-3'>
      <div className='w-1/2 flex flex-col items-start rounded-2xl p-4 border border-border bg-card'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-muted-foreground uppercase text-xs font-display font-semibold'>
            Receitas
          </p>
          <div className='bg-positive/15 rounded-full p-2'>
            <TrendingUpIcon size={20} className='text-positive' />
          </div>
        </div>
        <div>
          <p className='font-display font-bold text-xl text-foreground pt-2'>
            R${totalIncome}
          </p>
          <Badge isActiveData {...onBadgeIncome} />
        </div>
      </div>
      <div className='w-1/2 flex flex-col items-start rounded-2xl p-4 border border-border bg-card'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-muted-foreground uppercase text-xs font-display font-semibold'>
            Despesas
          </p>
          <div className='bg-negative/15 rounded-full p-2'>
            <TrendingDownIcon size={20} className='text-negative' />
          </div>
        </div>
        <div>
          <p className='font-display font-bold text-xl text-foreground pt-2'>
            R${totalExpense}
          </p>
          <Badge isActiveData {...onBagdeExpense} />
        </div>
      </div>
    </div>
  )
}
