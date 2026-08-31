import { getInitials } from '../utils/getInitials'

type AvatarProps = {
  name: string
}

export const Avatar = ({ name }: AvatarProps) => {

  return (
    <div className='relative'>
      <div className='bg-negative/10 rounded-full p-3'>
        <p className='text-negative font-semibold font-display'>{getInitials(name)}</p>
      </div>
      <div className='absolute top-8 left-9 bg-positive size-3.5 rounded-full border-2 border-background' />
    </div>
  )
}