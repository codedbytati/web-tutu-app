import React, { forwardRef, useState } from 'react'
import { tv } from 'tailwind-variants'

const makeSelectStyles = tv({
  base: [
    'w-full flex items-center gap-2 bg-white border border-border p-2 transition-colors relative cursor-pointer',
    'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
    'has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed',
    '[&_select]:outline-none [&_select]:w-full [&_select]:bg-transparent [&_select]:appearance-none',
    '[&_select[data-placeholder="true"]]:text-muted-foreground',
    '[&_select[data-placeholder="false"]]:text-foreground',
    '[&_svg]:ml-3'
  ],
  variants: {
    size: {
      sm: 'rounded-xl px-3 h-9 [&_select]:text-xs',
      md: 'rounded-2xl px-4 h-11 [&_select]:text-sm',
      lg: 'rounded-2xl px-5 h-14 [&_select]:text-base'
    },
    isInvalid: {
      true: 'border-2 border-negative'
    }
  }
})

const makeOptionStyles = tv({
  base: [
    'bg-white text-foreground text-sm border border-primary',
    'disabled:text-muted-foreground hover:bg-primary-foreground checked:bg-primary-foreground'
  ]
})

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> & {
  label: string
  placeholder?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  errorMessage?: string
  isInvalid?: boolean
  children?: React.ReactNode
}

export type SelectItemProps = React.OptionHTMLAttributes<HTMLOptionElement>

export const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <option ref={ref} className={makeOptionStyles()} {...props}>
        {children}
      </option>
    )
  }
)

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      hint,
      errorMessage,
      isInvalid,
      size = 'md',
      children,
      value,
      defaultValue = '',
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const hasError = isInvalid || Boolean(errorMessage)
    const message = errorMessage || hint

    const [selectedValue, setSelectedValue] = useState(
      value ?? defaultValue ?? ''
    )

    const currentSelection = value !== undefined ? value : selectedValue
    const isPlaceholderSelected = currentSelection === ''

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value)
      if (onChange) onChange(e)
    }

    return (
      <div className={className}>
        <p className='font-display text-foreground text-xs font-semibold mb-1.5'>
          {label}
        </p>
        <select
          ref={ref}
          className={makeSelectStyles({ size, isInvalid: hasError })}
          value={currentSelection}
          onChange={handleChange}
          data-placeholder={isPlaceholderSelected ? 'true' : 'false'}
          {...props}
        >
          {placeholder && <SelectItem hidden>{placeholder}</SelectItem>}
          {children}
        </select>

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

Select.displayName = 'Select'
SelectItem.displayName = 'SelectItem'
