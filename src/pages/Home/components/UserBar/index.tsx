import { Bell, Search } from 'lucide-react'

type UserBarProps = {
  name: string
}

export const UserBar = ({ name }: UserBarProps) => {
  return (
    <div className='flex items-center justify-between mt-5 mb-4 mx-5'>
      <div className='flex items-center gap-3'>
        <div className='bg-tutu-coral/10 rounded-full p-3'><p>AA</p></div>
        <div>
          <p className='text-tutu-muted text-xs'>Olá,</p>
          <p className='text-tutu-ink text-sm font-bold font-display'>{name}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='bg-tutu-card border border-tutu-border rounded-full p-3'>
          <Search size={16} className='text-tutu-muted' />
        </div>
        <div className='bg-tutu-card border border-tutu-border rounded-full p-3'>
          <Bell size={16} className='text-tutu-muted' />
        </div>
      </div>
    </div>
  )
}