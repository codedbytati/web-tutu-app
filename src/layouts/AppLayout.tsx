import { Outlet, useLocation } from 'react-router'
import {
  ArrowLeftRightIcon,
  ChartSplineIcon,
  CreditCardIcon,
  HomeIcon,
  UserIcon,
  type LucideIcon
} from 'lucide-react'
import { Header, Sidebar } from '@tutu-components'

interface RouteConfig {
  label: string
  icon: LucideIcon
}

const routeMap: Record<string, RouteConfig> = {
  '/': { label: 'Início', icon: HomeIcon },
  '/transacoes': { label: 'Transações', icon: ArrowLeftRightIcon },
  '/analises': { label: 'Análises', icon: ChartSplineIcon },
  '/cartoes': { label: 'Cartões', icon: CreditCardIcon },
  '/perfil': { label: 'Perfil', icon: UserIcon },
}

const defaultConfig: RouteConfig = {
  label: 'Início',
  icon: HomeIcon,
}

export function AppLayout() {
  const location = useLocation()
  const currentRoute = routeMap[location.pathname] || defaultConfig

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1'>
        <Header icon={currentRoute.icon} label={currentRoute.label} />
        <main className="w-full flex mt-5 justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  )
}