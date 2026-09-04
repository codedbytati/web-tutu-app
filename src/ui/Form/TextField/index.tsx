import React, { forwardRef } from 'react'
import { tv } from 'tailwind-variants'
import type { LucideIcon } from 'lucide-react'

const makeStyles = tv({
  base: [
    'flex items-center gap-2 border border-border py-2 transition-colors',
    'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    '[&_input]:outline-none [&_input]:w-full [&_input]:bg-transparent [&_input]:placeholder:text-muted-foreground'
  ],
  variants: {
    size: {
      sm: 'rounded-xl px-3 h-9 [&_input]:text-xs',
      md: 'rounded-2xl px-4 h-11 [&_input]:text-sm',
      lg: 'rounded-2xl px-5 h-14 [&_input]:text-base'
    },
    isInvalid: {
      true: ['border-2 border-negative']
    }
  }
})

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label: string
  placeholder: string
  icon?: LucideIcon
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  errorMessage?: string
  isInvalid?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      placeholder,
      hint,
      errorMessage,
      isInvalid,
      icon: Icon,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const hasError = isInvalid || Boolean(errorMessage)
    const message = errorMessage || hint

    return (
      <div>
        <p className='font-display text-foreground text-xs font-semibold mb-1.5'>
          {label}
        </p>
        <div className={makeStyles({ size, isInvalid: hasError })}>
          {Icon && <Icon className='text-muted-foreground' size={15} />}
          <input ref={ref} placeholder={placeholder} {...props} />
        </div>
        {message && (
          <p
            className={`text-xs pt-1.5 ${hasError ? 'text-negative' : 'text-muted-foreground'}`}
          >
            {message}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
