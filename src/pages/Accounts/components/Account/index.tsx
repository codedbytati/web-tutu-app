import { Text } from '@tutu-ui'
import { LandmarkIcon, Trash2Icon } from 'lucide-react'

export const Account = ({ account }: { account: any }) => {
  return (
    <div key={account.id} className='flex items-center justify-between rounded-3xl shadow-lg bg-white px-5 py-4'>
      <div className='flex items-center gap-4'>
        <div className='bg-foreground rounded-2xl p-3'>
          <LandmarkIcon size={20} className='text-card' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <Text className='font-bold font-display'>{account.nickname || 'Conta'}</Text>
            <div className='bg-info/15 px-2 py-0.5 rounded-lg'>
              <p className='text-info text-[10px] font-semibold'>{account.type}</p>
            </div>
          </div>
          <Text appearance='caption' className='text-muted-foreground'>{account.bank || 'Banco não informado'}</Text>
        </div>
      </div>
      <div className='flex flex-col items-end gap-1.5'>
        <Text appearance='body1' className='font-display font-bold'>R${Number(account.balance ?? 0).toFixed(2)}</Text>
        <div className='bg-muted p-2 rounded-lg'>
          <Trash2Icon size={11} className='text-muted-foreground' />
        </div>
      </div>
    </div>
  )
}