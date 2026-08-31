import { Avatar } from '@tutu-ui'

type ProfileInfoProps = {
  name: string
  email: string
}

export const ProfileInfo = ({ name, email }: ProfileInfoProps) => {
  return (
    <div className='flex items-center gap-3 bg-muted px-3 py-2.5 rounded-2xl'>
      <Avatar name={name} />
      <div className='flex flex-col'>
        <p className='font-display text-sm font-semibold text-tutu-ink'>{name}</p>
        <p className='text-xs text-tutu-muted'>{email}</p>
      </div>
    </div>
  )
}