import { ArrowDownUpIcon, CircleMinusIcon, CirclePlusIcon } from 'lucide-react'

export const ActionButtons = () => {
  return (
    <div className='flex gap-3 justify-between'>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-coral/10 rounded-2xl border border-tutu-coral/20 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <CircleMinusIcon size={22} className='text-tutu-coral' />
        <h1 className='font-display font-bold text-tutu-coral text-xs'>Despesa</h1>
      </button>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-mint/10 rounded-2xl border border-tutu-mint/20 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <CirclePlusIcon size={22} className='text-tutu-mint' />
        <h1 className='font-display font-bold text-tutu-mint text-xs'>Receita</h1>
      </button>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-tutu-violet rounded-2xl shadow-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <ArrowDownUpIcon size={22} className='text-tutu-card' />
        <h1 className='font-display font-bold text-tutu-card text-xs'>Transferência</h1>
      </button>
    </div>
  )
}