import { CreditCardIcon } from 'lucide-react'

export const TransactionItem = () => {
  return (
    <div className='flex items-center justify-between p-3 cursor-pointer border-b border-b-border last:border-b-0 hover:bg-background hover:rounded-2xl'>
      <div className='flex items-center gap-3'>
        <div className='bg-negative/15 rounded-2xl p-2'>
          <CreditCardIcon size={20} className='text-foreground' />
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='font-display font-semibold text-sm text-foreground'>Compra de produtos</p>
          <p className='text-xs text-muted-foreground'>Despesa · Hoje</p>
        </div>
      </div>
      <p className='font-display font-bold text-sm text-negative'>R$ 100,00</p>
    </div>
  )
}