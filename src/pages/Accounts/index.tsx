import { Button, Text } from '@tutu-ui'
import { Page } from '../../layouts/Page'
import { PlusIcon } from 'lucide-react'
import { Card } from './components/Card'
import { AddAccountCard } from './components/AddAccountCard'
import { useState } from 'react'
import { useAccount } from '@tutu-hooks'
import { Account } from './components/Account'

export const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useAccount()
  const accounts = data?.account ?? []
  const cards = data?.cards ?? []

  return (
    <div className='w-1/2'>
      <div className='flex items-center justify-between mb-4 mx-5'>
        <div>
          <Text appearance='h3' as='h1' className='font-bold'>Contas & Cartões</Text>
          <Text appearance='caption' className='text-muted-foreground'>{accounts.length} contas · {cards.length} cartões</Text>
        </div>
        <Button size='sm' onClick={() => setIsModalOpen(true)}>
          <PlusIcon />
          Adicionar
        </Button>
      </div>
      <Page>
        <div className='flex flex-col gap-3 mb-6'>
          <div className='flex items-center gap-2'>
            <Text appearance='caption' className='font-bold font-display uppercase text-muted-foreground'>Contas</Text>
            <div className='bg-muted rounded-lg px-2 py-1'>
              <p className='text-muted-foreground font-semibold text-[10px]'>{accounts.length}</p>
            </div>
          </div>
          {accounts.map((account) => (
            <Account account={account} />
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <Text appearance='caption' className='font-bold font-display uppercase text-muted-foreground'>Cartões de crédito</Text>
            <div className='bg-muted rounded-lg px-2 py-1'>
              <p className='text-muted-foreground font-semibold text-[10px]'>{cards.length}</p>
            </div>
          </div>
          {cards.map((card) => {
            const limit = Number(card.limit ?? 0).toFixed(2)
            return (
              <Card
                key={card.id}
                nickname={card.nickname || card.name || 'Cartão'}
                bank={card.bank || 'Banco não informado'}
                limit={limit}
                spent='0.00'
                available={limit}
              />
            )
          })}
        </div>
      </Page>
      <AddAccountCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}