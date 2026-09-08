import { Badge, Text } from '@tutu-ui'
import { ArchiveIcon, ArchiveRestoreIcon, LandmarkIcon } from 'lucide-react'
import { tv } from 'tailwind-variants'
import type { AccountModel } from '../../../../domain'
import {
  ACCOUNT_TYPES,
  type Bank,
  getBankPattern,
  formatCurrency
} from '../../../utils'

const makeStyles = tv({
  base: 'flex items-center justify-between rounded-3xl shadow-lg bg-white px-5 py-4 border-t-6',
  variants: {
    bank: {
      BANCO_BRASIL: 'border-t-[#ffdf00]',
      ITAU: 'border-t-[#ec7000]',
      NUBANK: 'border-t-[#820ad1]',
      SANTANDER: 'border-t-[#ec0000]',
      CAIXA: 'border-t-[#005ca9]',
      BRADESCO: 'border-t-[#cc092f]',
      INTER: 'border-t-[#ff7a00]',
      C6: 'border-t-black',
      BTG: 'border-t-[#172b4d]',
      SICREDI: 'border-t-[#00843d]'
    },
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
  const bankPattern = getBankPattern(account.bank)
  const bank = account.bank as Bank


  return (
    <div
      key={account.id}
      className={makeStyles({ bank, isDeactivate: isBlocked })}
    >
      <div className='flex items-center gap-4'>
        <div className={`${bankPattern.background} rounded-2xl p-3`}>
          <LandmarkIcon size={20} className='text-card' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <Text className='font-bold font-display'>
              {account.nickname}
            </Text>
            <Badge
              label={ACCOUNT_TYPES[account.type].label}
              color={ACCOUNT_TYPES[account.type].color}
            />
            {isBlocked && (
              <Badge label='Desativado' color='gray' />
            )}
          </div>
          <Text appearance='caption' className='text-muted-foreground'>
            {bankPattern.name}
          </Text>
        </div>
      </div>
      <div className='flex flex-col items-end gap-1.5'>
        <Text appearance='body1' className='font-display font-bold'>
          R${formatCurrency(account.balance)}
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
