import { Avatar } from '@tutu-ui'
import { Bell, Search } from 'lucide-react'

type UserBarProps = {
  name: string
}

export const UserBar = ({ name }: UserBarProps) => {
  return (
    <div className='flex items-center justify-between mt-5 mb-4 mx-5'>
      <div className='flex items-center gap-3'>
        <Avatar name={name} />
        <div>
          <p className='text-tutu-muted text-xs'>Olá,</p>
          <p className='text-tutu-ink text-sm font-bold font-display'>{name}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='bg-tutu-card border border-tutu-border rounded-full p-3 group hover:bg-tutu-surface cursor-pointer'>
          <Search size={16} className='text-tutu-muted group-hover:text-tutu-ink' />
        </div>
        <div className='bg-tutu-card border border-tutu-border rounded-full p-3 group hover:bg-tutu-surface cursor-pointer'>
          <Bell size={16} className='text-tutu-muted group-hover:text-tutu-ink' />
        </div>
      </div>
    </div>
  )
}