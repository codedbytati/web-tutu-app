import React, { forwardRef, useState } from 'react'
import { tv } from 'tailwind-variants'

const makeStyles = tv({
  base: [
    'flex items-center gap-2 bg-white border border-border py-2 transition-colors',
    'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    '[&_input]:outline-none [&_input]:w-full [&_input]:bg-transparent [&_input]:placeholder:text-muted-foreground',
    '[&_p]:text-sm [&_p]:font-bold [&_p]:font-display'
  ],
  variants: {
    size: {
      sm: 'rounded-xl px-3 h-9 [&_input]:text-xs',
      md: 'rounded-2xl px-4 h-11 [&_input]:text-sm',
      lg: 'rounded-2xl px-5 h-14 [&_input]:text-base'
    },
    isInvalid: {
      true: ['border-2 border-negative']
    },
    type: {
      income: '[&_p]:text-positive',
      expense: '[&_p]:text-negative',
      transfer: '[&_p]:text-primary'
    }
  }
})

type CurrencyFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value'
> & {
  label: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  errorMessage?: string
  type?: 'income' | 'expense' | 'transfer'
  isInvalid?: boolean
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const formatCentsToCurrency = (cents: number): string => {
  const valueInReais = cents / 100
  return valueInReais.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const CurrencyField = forwardRef<HTMLInputElement, CurrencyFieldProps>(
  (
    {
      label,
      hint,
      errorMessage,
      isInvalid,
      type = 'transfer',
      size = 'md',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>(() => {
      if (typeof value === 'number') return formatCentsToCurrency(value)
      return value || ''
    })

    const hasError = isInvalid || Boolean(errorMessage)
    const message = errorMessage || hint

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digitsOnly = e.target.value.replace(/\D/g, '')

      if (!digitsOnly) {
        setDisplayValue('')
        onChange?.({
          ...e,
          target: { ...e.target, value: '' }
        })
        return
      }

      // Convert digits to numeric value in cents
      const cents = parseInt(digitsOnly, 10)
      const formattedValue = formatCentsToCurrency(cents)

      setDisplayValue(formattedValue)
      onChange?.({
        ...e,
        target: { ...e.target, value: formattedValue }
      })
    }

    return (
      <div>
        <p className='font-display text-foreground text-xs font-semibold mb-1.5'>
          {label}
        </p>
        <div className={makeStyles({ type, size, isInvalid: hasError })}>
          <p>R$</p>
          <input
            {...props}
            type='text'
            inputMode='numeric'
            ref={ref}
            placeholder='0,00'
            value={displayValue}
            onChange={handleChange}
          />
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

CurrencyField.displayName = 'CurrencyField'