import { tv } from 'tailwind-variants'
import { getInitials } from '../utils/getInitials'

const makeStyles = tv({
  base: [
    'flex justify-center items-center bg-negative/10 rounded-full',
    '[&_p]:text-negative [&_p]:font-semibold [&_p]:font-display'
  ],
  variants: {
    size: {
      xs: 'size-6 [&_p]:text-[9px]',
      sm: 'size-8 [&_p]:text-xs',
      md: 'size-10 [&_p]:text-sm',
      lg: 'size-12 [&_p]:text-base',
      xl: 'size-16 [&_p]:text-xl'
    }
  }
})

type AvatarProps = {
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Avatar = ({ name = 'Sem nome', size = 'lg', className }: AvatarProps) => {
  return (
    <div className={makeStyles({ size, className })}>
      <p>{getInitials(name)}</p>
    </div>
  )
}
