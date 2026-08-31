import { getInitials } from '../../utils/getInitials'

type AvatarProps = {
  name: string
}

export const Avatar = ({ name }: AvatarProps) => {

  return (
    <div className='relative'>
      <div className='bg-tutu-coral/10 rounded-full p-3'>
        <p className='text-tutu-coral font-semibold font-display'>{getInitials(name)}</p>
      </div>
      <div className='absolute top-8 left-9 bg-tutu-mint size-3.5 rounded-full border-2 border-tutu-surface' />
    </div>
  )
}