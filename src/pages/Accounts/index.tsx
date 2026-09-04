import { PlusIcon } from 'lucide-react'
import { Button, Text } from '@tutu-ui'
import { Page } from '../../layouts/Page'
import { Account, AddAccountCard, CreditCard } from './components'
import { useLoadAccounts } from './core/useLoadAccounts'

export const Accounts = () => {
  const {
    accounts,
    cards,
    deactivateAccount,
    deactivateCreditCard,
    onOpenAddAccount,
    addAccount
  } = useLoadAccounts()

  return (
    <Page>
      <Page.Header>
        <div>
          <Text appearance='h3' as='h1' className='font-bold'>
            Contas & Cartões
          </Text>
          <Text appearance='caption' className='text-muted-foreground'>
            {accounts.length} contas · {cards.length} cartões
          </Text>
        </div>
        <Button
          size='sm'
          className='flex justify-center items-center gap-2'
          onClick={onOpenAddAccount}
        >
          <PlusIcon size={13} />
          Adicionar
        </Button>
      </Page.Header>
      <Page.Body>
        <div className='flex flex-col gap-3 mb-6'>
          <div className='flex items-center gap-2'>
            <Text
              appearance='caption'
              className='font-bold font-display uppercase text-muted-foreground'
            >
              Contas
            </Text>
            <div className='bg-muted rounded-lg px-2 py-1'>
              <p className='text-muted-foreground font-semibold text-[10px]'>
                {accounts.length}
              </p>
            </div>
          </div>
          {accounts.map((account) => (
            <Account key={account.id} account={account} onBlock={(id) => deactivateAccount(id)} />
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <Text
              appearance='caption'
              className='font-bold font-display uppercase text-muted-foreground'
            >
              Cartões de crédito
            </Text>
            <div className='bg-muted rounded-lg px-2 py-1'>
              <p className='text-muted-foreground font-semibold text-[10px]'>
                {cards.length}
              </p>
            </div>
          </div>
          {cards.map((card) => (
            <CreditCard
              key={card.id} onBlock={(id) => deactivateCreditCard(id)} card={card} />
          ))}
        </div>
      </Page.Body>
      <AddAccountCard {...addAccount} />
    </Page>
  )
}
