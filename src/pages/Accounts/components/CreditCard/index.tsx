import { ArchiveIcon, ArchiveRestoreIcon } from 'lucide-react'
import { Badge, ProgressBar, Text } from '@tutu-ui'
import type { CardModel } from '@tutu-domain'
import { getBankPattern } from '../../../utils/getBankPatterns'
import { formatCurrency } from '../../../utils'

type CardProps = {
  card: CardModel
  onBlock: (id: string) => void
}

export const CreditCard = ({ card, onBlock }: CardProps) => {
  const isBlocked = card.isDeactivate === true
  const bankPattern = getBankPattern(card.bank)
  const available = Math.max(card.limit - card.spent, 0)
  const rawPercentage = card.limit > 0 ? (card.spent / card.limit) * 100 : 0
  const usedPercentage = Math.min(Math.max(rawPercentage, 0), 100)

  return (
    <div className={isBlocked ? 'opacity-60 grayscale' : ''}>
      <div className={`flex justify-between items-center p-6 ${bankPattern.background} rounded-tl-3xl rounded-tr-3xl`}>
        <div>
          <div className='flex items-center gap-2'>
            <Text className='text-white text-lg font-bold'>{card.nickname}</Text>
            {isBlocked && (
              <span className='bg-white/20 rounded-lg px-2 py-0.5 text-[10px] font-semibold text-white'>
                Desativado
              </span>
            )}
          </div>
          <Text appearance='caption' className='text-white'>
            {bankPattern.name}
          </Text>
        </div>
        <button
          type='button'
          aria-label={isBlocked ? 'Desbloquear cartão' : 'Bloquear cartão'}
          onClick={() => onBlock(card.id)}
          className='bg-white/15 rounded-lg p-2 cursor-pointer'
        >
          {isBlocked ? (
            <ArchiveRestoreIcon size={12} className='text-white/70' />
          ) : (
            <ArchiveIcon size={12} className='text-white/70' />
          )}
        </button>
      </div>
      <div className='bg-white px-5 py-4 rounded-bl-3xl rounded-br-3xl shadow-lg'>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <Text appearance='caption' className='font-display font-semibold'>
              Uso do limite
            </Text>
            <Badge label={`${usedPercentage.toFixed(0)}%`} color='green' />
          </div>
          <ProgressBar percentage={usedPercentage} />
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
              R${formatCurrency(card.limit)}
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
              R${formatCurrency(card.spent)}
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
              R${formatCurrency(available)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
