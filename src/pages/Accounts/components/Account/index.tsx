import { Text } from '@tutu-ui'
import { ArchiveIcon, ArchiveRestoreIcon, LandmarkIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'
import type { AccountModel } from '../../../../domain'

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
            <div className='bg-info/15 px-2 py-0.5 rounded-lg'>
              <p className='text-info text-[10px] font-semibold'>
                {account.type}
              </p>
            </div>
            {isBlocked && (
              <div className='bg-negative/15 px-2 py-0.5 rounded-lg'>
                <p className='text-negative text-[10px] font-semibold'>
                  Desativada
                </p>
              </div>
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
          aria-label='Desativar conta'
          disabled={isBlocked}
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
