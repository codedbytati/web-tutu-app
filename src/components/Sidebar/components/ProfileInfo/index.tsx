import { Avatar } from '@tutu-ui'

type ProfileInfoProps = {
  name: string
  email: string
}

export const ProfileInfo = ({ name, email }: ProfileInfoProps) => {
  return (
    <div className='flex items-center gap-3 bg-muted px-3 py-2.5 rounded-2xl'>
      <div className='relative'>
        <Avatar name={name} />
        <div className='absolute top-8 left-9 bg-positive size-3.5 rounded-full border-2 border-background' />
      </div>
      <div className='flex flex-col'>
        <p className='font-display text-sm font-semibold text-foreground'>
          {name}
        </p>
        <p className='text-xs text-muted-foreground'>{email}</p>
      </div>
    </div>
  )
}
