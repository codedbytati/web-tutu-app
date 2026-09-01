import { useAuth } from '@tutu-contexts/authContext'
import { ColoredCard } from '@tutu-components'
import {
  ActionButtons,
  Analysis,
  BalanceChart,
  Transactions,
  UserBar
} from './components'

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
        <Transactions />
      </div>
    </div>
  )
}