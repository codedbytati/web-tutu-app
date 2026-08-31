import { ArrowDownUpIcon, CircleMinusIcon, CirclePlusIcon } from 'lucide-react'

export const ActionButtons = () => {
  return (
    <div className='flex gap-3 justify-between'>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-negative/10 rounded-2xl border border-negative/20 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <CircleMinusIcon size={22} className='text-negative' />
        <h1 className='font-display font-bold text-negative text-xs'>Despesa</h1>
      </button>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-positive/10 rounded-2xl border border-positive/20 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <CirclePlusIcon size={22} className='text-positive' />
        <h1 className='font-display font-bold text-positive text-xs'>Receita</h1>
      </button>
      <button className='flex flex-col items-center gap-2 w-52 p-4 bg-primary rounded-2xl shadow-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-97'>
        <ArrowDownUpIcon size={22} className='text-card' />
        <h1 className='font-display font-bold text-card text-xs'>Transferência</h1>
      </button>
    </div>
  )
}