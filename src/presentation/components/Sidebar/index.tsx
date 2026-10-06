import { useAuth } from '@tutu-contexts/authContext'
import Logo from '../../../assets/logo.png'
import { Menu, ProfileInfo } from './components'

export const Sidebar = () => {
  const { loggedUser } = useAuth()

  return (
    <div className='bg-card border-r border-r-border'>
      <div className='flex items-center gap-2 p-6 border-b border-b-border'>
        <img
          src={Logo}
          alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco'
        />
        <h1 className='font-display font-black text-foreground'>tutu</h1>
      </div>
      <div className='p-6 border-b border-b-border'>
        <ProfileInfo
          name={loggedUser?.displayName ?? ''}
          email={loggedUser?.email ?? ''}
        />
      </div>
      <Menu />
    </div>
  )
}
