import { Header, Sidebar } from '@tutu-components'
import { House } from 'lucide-react'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className='flex-1'>
        <Header icon={House} label='Início' />
        <main className="w-full flex justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  )
}