import { Avatar } from '@tutu-ui'
import Logo from '../../assets/logo.png'
import { Menu } from './components/Menu'

export const Sidebar = () => {
  return (
    <div className='bg-tutu-card border-r border-r-tutu-border'>
      <div className='flex items-center gap-2 p-6 border-b border-b-tutu-border'>
        <img src={Logo} alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco' />
        <h1 className='font-display font-black text-tutu-ink'>tutu</h1>
      </div>
      <div className='p-6 border-b border-b-tutu-border'>
        <div className='flex items-center gap-3 bg-muted px-3 py-2.5 rounded-2xl'>
          <Avatar />
          <div className='flex flex-col'>
            <p className='font-display text-sm font-semibold text-tutu-ink'>Maria Silva</p>
            <p className='text-xs text-tutu-muted'>maria.silva@email.com</p>
          </div>
        </div>
      </div>
      <Menu />
    </div>
  )
}