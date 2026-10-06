import {
  ArrowLeftRightIcon,
  ChartSplineIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon
} from 'lucide-react'
import { NavLink } from 'react-router'
import { makeStyles } from './style'
import { preloadRoutes } from '../../../../routeLoaders'
import { queryClient } from '../../../../services/queryClient'
import { accountsQueryOptions } from '../../../../services/account/useGetAccounts'
import { transactionsQueryOptions } from '../../../../services/transaction/useGetTransactions'

const menuItems = [
  { to: '/', label: 'Início', icon: HomeIcon, color: 'violet' },
  {
    to: '/transacoes',
    label: 'Transações',
    icon: ArrowLeftRightIcon,
    color: 'sky'
  },
  { to: '/analises', label: 'Análises', icon: ChartSplineIcon, color: 'mint' },
  {
    to: '/cartoes',
    label: 'Contas & Cartões',
    icon: CreditCardIcon,
    color: 'amber'
  },
  { to: '/perfil', label: 'Perfil', icon: UserIcon, color: 'coral' }
] as const

const preloadRoute = (to: (typeof menuItems)[number]['to']) => {
  preloadRoutes[to]().catch((error: unknown) => {
    console.error(`Falha ao pré-carregar a rota ${to}.`, error)
  })

  let preloadData: Promise<unknown>
  if (to === '/' || to === '/cartoes') {
    preloadData =
      to === '/'
        ? Promise.all([
            queryClient.prefetchQuery(accountsQueryOptions),
            queryClient.prefetchQuery(transactionsQueryOptions)
          ])
        : queryClient.prefetchQuery(accountsQueryOptions)
  } else if (to === '/transacoes' || to === '/analises') {
    preloadData = queryClient.prefetchQuery(transactionsQueryOptions)
  } else {
    preloadData = Promise.resolve()
  }

  preloadData.catch((error: unknown) => {
    console.error(`Falha ao pré-carregar os dados da rota ${to}.`, error)
  })
}

export const Menu = () => {
  return (
    <nav className='p-3 flex flex-col gap-1'>
      {menuItems.map(({ to, label, icon: Icon, color }) => (
        <NavLink
          key={to}
          to={to}
          onMouseEnter={() => preloadRoute(to)}
          onFocus={() => preloadRoute(to)}
        >
          {({ isActive }) => {
            const {
              base,
              icon,
              label: labelStyle
            } = makeStyles({ isActive, color })
            return (
              <div className={base()}>
                <Icon className={icon()} />
                <p className={labelStyle()}>{label}</p>
              </div>
            )
          }}
        </NavLink>
      ))}
    </nav>
  )
}
