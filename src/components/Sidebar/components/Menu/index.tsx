import {
  ArrowLeftRightIcon,
  ChartSplineIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon
} from 'lucide-react'
import { NavLink } from 'react-router'
import { makeStyles } from './style'

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

export const Menu = () => {
  return (
    <nav className='p-3 flex flex-col gap-1'>
      {menuItems.map(({ to, label, icon: Icon, color }) => (
        <NavLink key={to} to={to}>
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
