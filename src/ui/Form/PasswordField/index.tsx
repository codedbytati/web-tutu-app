import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { Eye, EyeOff } from 'lucide-react'

const makeStyles = tv({
  base: ['flex items-center justify-between gap-2 border border-border py-2',
    'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
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
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

export const PasswordField = ({ label, placeholder, hint, size = 'md' }: TextFieldProps) => {
  const [hidden, setIsHidden] = useState(true)

  return (
    <div>
      <p className='font-display text-foreground text-xs font-semibold mb-1.5'>{label}</p>
      <div className={makeStyles({ size })}>
        <input type={hidden ? 'password' : 'text'} placeholder={placeholder} />
        {hidden ?
          <Eye className='text-muted-foreground cursor-pointer' size={15} onClick={() => setIsHidden(false)} /> :
          <EyeOff className='text-muted-foreground cursor-pointer' size={15} onClick={() => setIsHidden(true)} />
        }
      </div>
      {hint && <p className='text-muted-foreground text-xs pt-1.5'>{hint}</p>}
    </div>
  )
}