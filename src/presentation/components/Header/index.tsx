import type { LucideIcon } from 'lucide-react'

type HeaderProps = {
  icon: LucideIcon
  label: string
}

export const Header = ({ icon: Icon, label }: HeaderProps) => {
  return (
    <div className='flex items-center gap-2 bg-card py-3 px-6 border-b border-b-border'>
      <div className='bg-primary/15 rounded-xl p-2'>
        <Icon size={22} className='text-foreground' />
      </div>
      <h1 className='font-display font-bold text-foreground text-sm'>
        {label}
      </h1>
    </div>
  )
}
