import { ArrowDownUpIcon, CircleMinusIcon, CirclePlusIcon, House } from 'lucide-react'
import { Header } from '@tutu-components'
import { BalanceCard, UserBar } from './components'

export const Home = () => {
  return (
    <div>
      <Header icon={House} label='Início' />
      <UserBar name='Ana' />
      <div className='flex flex-col gap-6 mx-5'>
        <BalanceCard />
        <div className='flex gap-3 justify-between'>
          <div className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-coral/10 rounded-2xl border border-tutu-coral/20'>
            <CircleMinusIcon size={22} className='text-tutu-coral' />
            <h1 className='font-display font-bold text-tutu-coral text-xs'>Despesa</h1>
          </div>
          <div className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-mint/10 rounded-2xl border border-tutu-mint/20'>
            <CirclePlusIcon size={22} className='text-tutu-mint' />
            <h1 className='font-display font-bold text-tutu-mint text-xs'>Receita</h1>
          </div>
          <div className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-violet rounded-2xl shadow-md'>
            <ArrowDownUpIcon size={22} className='text-tutu-card' />
            <h1 className='font-display font-bold text-tutu-card text-xs'>Transferência</h1>
          </div>
        </div>
      </div>
    </div>
  )
}