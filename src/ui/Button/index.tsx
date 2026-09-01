import type { ButtonHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const makeStyles = tv({
  base: ['font-display font-semibold cursor-pointer py-4',
    'transition-all duration-200 ease-in-out hover:opacity-90',
    'disabled:cursor-not-allowed disabled:opacity-40',
    'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none'],
  variants: {
    variant: {
      primary: 'bg-primary text-card',
      secondary: 'bg-lavender text-foreground',
      ghost: 'bg-transparent text-foreground',
      positive: 'bg-positive text-card',
      danger: 'bg-negative text-card',
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
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>['disabled']
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
}

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  className
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={makeStyles({ variant, size, className })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}