import type { LucideIcon } from 'lucide-react'

type TransactionItemProps = {
  icon: LucideIcon;
  description: string;
  type: string;
  date: string;
  amount: string
}

export const TransactionList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-card rounded-2xl p-1 border border-border mt-1'>
      {children}
    </div>
  )
}

TransactionList.Item = function TransactionItem({
  icon: Icon,
  description,
  type,
  date,
  amount }: TransactionItemProps) {
  return (
    <div className='flex items-center justify-between p-3 cursor-pointer border-b border-b-border last:border-b-0 hover:bg-background hover:rounded-2xl'>
      <div className='flex items-center gap-3'>
        <div className='bg-negative/15 rounded-2xl p-2'>
          <Icon size={20} className='text-foreground' />
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='font-display font-semibold text-sm text-foreground'>{description}</p>
          <p className='text-xs text-muted-foreground'>{type} · {date}</p>
        </div>
      </div>
      <p className='font-display font-bold text-sm text-negative'>R$ {amount}</p>
    </div>
  )
}