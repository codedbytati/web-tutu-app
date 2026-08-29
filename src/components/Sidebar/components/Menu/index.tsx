import { tv } from 'tailwind-variants'
import { ArrowDownUpIcon, ChartSplineIcon, CreditCardIcon, HomeIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router'

const makeStyles = tv({
  base: 'relative flex items-center gap-3 py-3 px-4 cursor-pointer',
  variants: {
    active: {
      true: ['rounded-2xl bg-tutu-violet [&_p]:text-tutu-card [&_svg]:text-tutu-card',
        'after:absolute after:right-3 after:size-2 after:bg-tutu-card/60 after:rounded-full'],
    }
  }
})

export const Menu = () => {
  return (
    <div className='p-3'>
      <Link to='/' className={makeStyles({ active: true })}>
        <HomeIcon size={22} className='text-tutu-muted' />
        <p className='font-display font-semibold text-tutu-muted text-sm'>Início</p>
      </Link>
      <Link to='/transferencias' className='flex items-center gap-3 py-3 px-4'>
        <ArrowDownUpIcon size={22} className='text-tutu-muted' />
        <p className='font-display font-semibold text-tutu-muted text-sm'>Transferências</p>
      </Link>
      <Link to='/analises' className='flex items-center gap-3 py-3 px-4'>
        <ChartSplineIcon size={22} className='text-tutu-muted' />
        <p className='font-display font-semibold text-tutu-muted text-sm'>Análises</p>
      </Link>
      <Link to='/cartoes' className='flex items-center gap-3 py-3 px-4'>
        <CreditCardIcon size={22} className='text-tutu-muted' />
        <p className='font-display font-semibold text-tutu-muted text-sm'>Cartões</p>
      </Link>
      <Link to='/perfil' className='flex items-center gap-3 py-3 px-4'>
        <UserIcon size={22} className='text-tutu-muted' />
        <p className='font-display font-semibold text-tutu-muted text-sm'>Perfil</p>
      </Link>
    </div>
  )
}