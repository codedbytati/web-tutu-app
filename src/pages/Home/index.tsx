import { useAuth } from '@tutu-contexts/authContext'
import { ColoredCard } from '@tutu-components'
import {
  ActionButtons,
  Analysis,
  BalanceChart,
  UserBar
} from './components'
import { HomeIcon } from 'lucide-react'
import { TransactionList } from '@tutu-components/TransactionList'

export const Home = () => {
  const { loggedUser } = useAuth()

  return (
    <div className='w-1/2'>
      <UserBar name={loggedUser?.displayName ?? 'Boas vindas'} />
      <div className='flex flex-col gap-6 mx-5 mb-6'>
        <ColoredCard>
          <p className='text-card/65 uppercase font-semibold font-display text-xs'>Saldo total</p>
          <p className='font-display font-bold text-3xl text-card'>R$ 1.000,00</p>
        </ColoredCard>
        <ActionButtons />
        <Analysis />
        <BalanceChart />
        <div>
          <div className='flex items-center justify-between'>
            <h2 className='font-display font-bold text-sm text-foreground'>Últimas transações</h2>
            <a href='/transferencias' className='font-semibold text-xs text-primary'>Ver todos</a>
          </div>
          <TransactionList>
            <TransactionList.Item
              icon={HomeIcon}
              description='Compra de produtos'
              type='Débito'
              date='01/01/2023'
              amount='100,00'
            />
          </TransactionList>
        </div>
      </div>
    </div>
  )
}