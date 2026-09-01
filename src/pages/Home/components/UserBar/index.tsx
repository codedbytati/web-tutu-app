import { Avatar } from '@tutu-ui'
import { Bell, Search } from 'lucide-react'

type UserBarProps = {
  name: string
}

export const UserBar = ({ name }: UserBarProps) => {
  return (
    <div className='flex items-center justify-between mb-4 mx-5'>
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <Avatar name={name} />
          <div className='absolute top-8 left-9 bg-positive size-3.5 rounded-full border-2 border-background' />
        </div>
        <div>
          <p className='text-muted-foreground text-xs'>Olá,</p>
          <p className='text-foreground text-sm font-bold font-display'>{name}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='bg-card border border-border rounded-full p-3 group hover:bg-background cursor-pointer'>
          <Search size={16} className='text-muted-foreground group-hover:text-foreground' />
        </div>
        <div className='bg-card border border-border rounded-full p-3 group hover:bg-background cursor-pointer'>
          <Bell size={16} className='text-muted-foreground group-hover:text-foreground' />
        </div>
      </div>
    </div>
  )
}