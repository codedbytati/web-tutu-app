import { X } from 'lucide-react'
import { Text } from '@tutu-ui'

type CardProps = {
  nickname: string;
  bank: string;
  limit: string;
  spent: string;
  available: string
}

export const Card = ({ nickname, bank, limit, spent, available }: CardProps) => {
  return (
    <div>
      <div className='flex justify-between items-center p-6 bg-primary rounded-tl-3xl rounded-tr-3xl'>
        <div>
          <Text className='text-white text-lg font-bold'>{nickname}</Text>
          <Text appearance='caption' className='text-white'>{bank}</Text>
        </div>
        <div className='bg-white/15 rounded-lg p-1'>
          <X size={12} className='text-white/70' />
        </div>
      </div>
      <div className='bg-white px-5 py-4 rounded-bl-3xl rounded-br-3xl shadow-lg'>
        <div className='flex justify-between'>
          <Text appearance='caption' className='font-display font-semibold'>Uso do limite</Text>
          <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
            <div className='size-1.5 bg-positive rounded-full' />
            <p className='text-positive text-[10px] font-semibold'>+8%</p>
          </div>
        </div>
        <div className='flex justify-between mt-3'>
          <div>
            <Text appearance='caption' className='text-[10px] text-muted-foreground'>Limite</Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>R${limit}</Text>
          </div>
          <div>
            <Text appearance='caption' className='text-[10px] text-muted-foreground'>Usado</Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>R${spent}</Text>
          </div>
          <div>
            <Text appearance='caption' className='text-[10px] text-muted-foreground'>Disponível</Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>R${available}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}