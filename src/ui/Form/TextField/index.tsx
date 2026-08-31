import { tv } from 'tailwind-variants'
import type { LucideIcon } from 'lucide-react'

const makeStyles = tv({
  base: ['flex items-center gap-2 border border-tutu-border py-2',
    'focus-within:ring-2 focus-within:ring-tutu-violet focus-within:ring-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    '[&_input]:outline-none [&_input]:w-full [&_input]:bg-transparent'],
  variants: {
    size: {
      sm: 'rounded-xl px-3 h-9 [&_input]:text-xs',
      md: 'rounded-2xl px-4 h-11 [&_input]:text-sm',
      lg: 'rounded-2xl px-5 h-14 [&_input]:text-base'
    }
  }
})

type TextFieldProps = {
  label: string
  placeholder: string
  icon?: LucideIcon
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

export const TextField = ({ label, placeholder, hint, icon: Icon, size = 'md' }: TextFieldProps) => {
  return (
    <div>
      <p className='font-display text-tutu-ink text-xs font-semibold mb-1.5'>{label}</p>
      <div className={makeStyles({ size })}>
        {Icon && <Icon className='text-tutu-muted' size={15} />}
        <input type="text" placeholder={placeholder} />
      </div>
      {hint && <p className='text-tutu-muted text-xs pt-1.5'>{hint}</p>}
    </div>
  )
}