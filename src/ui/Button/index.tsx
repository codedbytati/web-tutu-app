import { tv } from 'tailwind-variants'

const makeStyles = tv({
  base: ['font-display font-semibold cursor-pointer py-4',
    'transition-all duration-200 ease-in-out hover:bg-tutu-violet-dark',
    'disabled:cursor-not-allowed disabled:opacity-40',
    'focus:ring-2 focus:ring-tutu-violet focus:ring-offset-2 focus:outline-none'],
  variants: {
    variant: {
      primary: 'bg-tutu-violet text-tutu-card',
      secondary: 'bg-tutu-lavender text-tutu-ink',
      ghost: 'bg-transparent text-tutu-ink',
      positive: 'bg-tutu-mint text-tutu-card',
      danger: 'bg-tutu-coral text-tutu-card',
    },
    size: {
      sm: 'rounded-xl text-xs px-4',
      md: 'rounded-2xl text-sm px-5',
      lg: 'rounded-4xl text-base px-7',
    }
  }
})

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'positive' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={makeStyles({ variant, size })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}