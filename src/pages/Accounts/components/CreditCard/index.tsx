import { X } from 'lucide-react'
import { Text } from '@tutu-ui'
import type { CardModel } from '../../../../domain'

type CardProps = {
  card: CardModel
  onBlock: (id: string) => void
}

export const CreditCard = ({ card, onBlock }: CardProps) => {
  const isBlocked = card.isDeactivate === true

  return (
    <div className={isBlocked ? 'opacity-60 grayscale' : ''}>
      <div className='flex justify-between items-center p-6 bg-primary rounded-tl-3xl rounded-tr-3xl'>
        <div>
          <div className='flex items-center gap-2'>
            <Text className='text-white text-lg font-bold'>{card.nickname}</Text>
            {isBlocked && (
              <span className='bg-white/20 rounded-lg px-2 py-0.5 text-[10px] font-semibold text-white'>
                Bloqueado
              </span>
            )}
          </div>
          <Text appearance='caption' className='text-white'>
            {card.bank}
          </Text>
        </div>
        <button
          type='button'
          aria-label='Bloquear cartão'
          disabled={isBlocked}
          onClick={() => onBlock(card.id)}
          className='bg-white/15 rounded-lg p-1 disabled:cursor-not-allowed'
        >
          <X size={12} className='text-white/70' />
        </button>
      </div>
      <div className='bg-white px-5 py-4 rounded-bl-3xl rounded-br-3xl shadow-lg'>
        <div className='flex justify-between'>
          <Text appearance='caption' className='font-display font-semibold'>
            Uso do limite
          </Text>
          <div className='flex items-center gap-1 bg-positive/15 py-0.5 px-2 rounded-lg'>
            <div className='size-1.5 bg-positive rounded-full' />
            <p className='text-positive text-[10px] font-semibold'>+8%</p>
          </div>
        </div>
        <div className='flex justify-between mt-3'>
          <div>
            <Text
              appearance='caption'
              className='text-[10px] text-muted-foreground'
            >
              Limite
            </Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>
              R${card.limit}
            </Text>
          </div>
          <div>
            <Text
              appearance='caption'
              className='text-[10px] text-muted-foreground'
            >
              Usado
            </Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>
              R${card.spent}
            </Text>
          </div>
          <div>
            <Text
              appearance='caption'
              className='text-[10px] text-muted-foreground'
            >
              Disponível
            </Text>
            <Text appearance='body2' className='text-xs font-display font-bold'>
              R${card.available}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
