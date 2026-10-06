import { useAuth } from '@tutu-contexts/authContext'
import { ColoredCard } from '@tutu-components'
import {
  ActionButtons,
  Analysis,
  BalanceChart,
  Transactions,
  UserBar
} from './components'
import { useGetTotalSum } from './core/useGetTotalSum'
import { Page } from '../../layouts/Page'

export const Home = () => {
  const { loggedUser } = useAuth()
  const { balance } = useGetTotalSum()

  return (
    <Page>
      <Page.Header>
        <UserBar name={loggedUser?.displayName ?? 'Boas vindas'} />
      </Page.Header>
      <Page.Body>
        <ColoredCard>
          <p className='text-card/65 uppercase font-semibold font-display text-xs'>
            Saldo total
          </p>
          <p className='font-display font-bold text-3xl text-card'>
            R${balance}
          </p>
        </ColoredCard>
        <ActionButtons />
        <Analysis />
        <BalanceChart />
        <Transactions />
      </Page.Body>
    </Page>
  )
}
