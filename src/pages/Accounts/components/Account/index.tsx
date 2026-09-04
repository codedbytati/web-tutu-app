import { Badge, Text } from '@tutu-ui'
import { ArchiveIcon, ArchiveRestoreIcon, LandmarkIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'
import type { AccountModel } from '../../../../domain'
import { ACCOUNT_TYPES } from '../../../utils/getAccountType'

const makeStyles = tv({
  base: 'flex items-center justify-between rounded-3xl shadow-lg bg-white px-5 py-4 border-t-6',
  variants: {
    isDeactivate: {
      true: 'opacity-60 grayscale'
    }
  }
})

type AccountProps = {
  account: AccountModel
  onBlock: (id: string) => void
}

export const Account = ({ account, onBlock }: AccountProps) => {
  const isBlocked = account.isDeactivate === true


  return (
    <div
      key={account.id}
      className={makeStyles({ isDeactivate: isBlocked })}
    >
      <div className='flex items-center gap-4'>
        <div className='bg-foreground rounded-2xl p-3'>
          <LandmarkIcon size={20} className='text-card' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <Text className='font-bold font-display'>
              {account.nickname}
            </Text>
            <Badge label={ACCOUNT_TYPES[account.type].label} color={ACCOUNT_TYPES[account.type].color} />
            {isBlocked && (
              <Badge label='Desativado' color='gray' />
            )}
          </div>
          <Text appearance='caption' className='text-muted-foreground'>
            {account.bank}
          </Text>
        </div>
      </div>
      <div className='flex flex-col items-end gap-1.5'>
        <Text appearance='body1' className='font-display font-bold'>
          R${Number(account.balance ?? 0).toFixed(2)}
        </Text>
        <button
          type='button'
          aria-label={isBlocked ? 'Ativar conta' : 'Desativar conta'}
          onClick={() => onBlock(account.id)}
          className='bg-muted p-2 rounded-lg cursor-pointer'
        >
          {isBlocked ? (
            <ArchiveRestoreIcon size={12} className='text-muted-foreground' />
          ) : (
            <ArchiveIcon size={12} className='text-muted-foreground' />
          )}
        </button>
      </div>
    </div>
  )
}
