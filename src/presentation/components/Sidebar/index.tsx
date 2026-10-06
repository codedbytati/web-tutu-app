import { useAuth } from '@tutu-contexts/authContext'
import Logo from '../../../assets/logo.png'
import { Menu, ProfileInfo } from './components'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useUiStore } from '../../../store/uiStore'

export const Sidebar = () => {
  const { loggedUser } = useAuth()
  const { isSidebarCollapsed, toggleSidebar } = useUiStore()

  return (
    <div
      className={`bg-card border-r border-r-border transition-[width] ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className='flex items-center gap-2 p-6 border-b border-b-border'>
        <img
          src={Logo}
          alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco'
        />
        {!isSidebarCollapsed && (
          <h1 className='font-display font-black text-foreground'>tutu</h1>
        )}
        <button
          type='button'
          className='ml-auto rounded-md p-1 text-muted-foreground hover:bg-muted'
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isSidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
      </div>
      <div
        className={`p-6 border-b border-b-border ${
          isSidebarCollapsed ? 'hidden' : ''
        }`}
      >
        <ProfileInfo
          name={loggedUser?.displayName ?? ''}
          email={loggedUser?.email ?? ''}
        />
      </div>
      <Menu />
    </div>
  )
}
