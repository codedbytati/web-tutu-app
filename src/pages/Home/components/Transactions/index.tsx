import { TransactionItem } from './components/Items'

export const Transactions = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-display font-bold text-sm text-foreground'>Últimas transações</h2>
        <a href='/transferencias' className='font-semibold text-xs text-primary'>Ver todos</a>
      </div>
      <div className='bg-card rounded-2xl p-1 border border-border mt-1'>
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  )
}