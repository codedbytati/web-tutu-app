import type { LucideIcon } from 'lucide-react'

type HeaderProps = {
  icon: LucideIcon
  label: string
}

export const Header = ({ icon: Icon, label }: HeaderProps) => {
  return (
    <div className='flex items-center gap-2 bg-tutu-card py-3 px-6'>
      <div className='bg-tutu-violet/15 rounded-xl p-2'>
        <Icon size={22} className='text-tutu-ink' />
      </div>
      <h1 className='font-display font-bold text-tutu-ink text-sm'>{label}</h1>
    </div>
  )
}