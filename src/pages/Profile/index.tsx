import { ColoredCard } from '@tutu-components'
import { Avatar, Button, Text } from '@tutu-ui'
import { ChevronRight, CircleQuestionMarkIcon, LockIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/authContext'

export const Profile = () => {
  const { loggedUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className='w-1/2'>
      <Text appearance='h3' as='h1' className='font-bold mb-4 mx-5'>Perfil</Text>
      <div className='flex flex-col gap-6 mx-5 mb-6'>
        <ColoredCard>
          <div className='flex items-center gap-4'>
            <Avatar size='xl' name={loggedUser?.displayName ?? ''} />
            <div>
              <Text appearance='h3' as='p' className='text-card'>{loggedUser?.displayName ?? ''}</Text>
              <Text appearance='body2' className='text-card/70'>{loggedUser?.email ?? ''}</Text>
            </div>
          </div>
        </ColoredCard>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between py-3.5 px-4 rounded-2xl bg-card border border-border'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted rounded-xl p-2'>
                <UserIcon size={20} />
              </div>
              <div>
                <Text className='font-semibold font-display'>Dados pessoais</Text>
                <Text appearance='caption' className='text-muted-foreground '>Edite as suas informações pessoais</Text>
              </div>
            </div>
            <ChevronRight size={16} className='text-muted-foreground' />
          </div>
          <div className='flex items-center justify-between py-3.5 px-4 rounded-2xl bg-card border border-border'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted rounded-xl p-2'>
                <LockIcon size={20} />
              </div>
              <div>
                <Text className='font-semibold font-display'>Segurança</Text>
                <Text appearance='caption' className='text-muted-foreground '>Gerencie a sua senha</Text>
              </div>
            </div>
            <ChevronRight size={16} className='text-muted-foreground' />
          </div>
          <div className='flex items-center justify-between py-3.5 px-4 rounded-2xl bg-card border border-border'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted rounded-xl p-2'>
                <CircleQuestionMarkIcon size={20} />
              </div>
              <div>
                <Text className='font-semibold font-display'>Ajuda & Suporte</Text>
                <Text appearance='caption' className='text-muted-foreground '>Central de ajuda, contato</Text>
              </div>
            </div>
            <ChevronRight size={16} className='text-muted-foreground' />
          </div>
        </div>
        <Button
          size='md'
          className='bg-negative/10 border border-negative/15 text-negative'
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </div>
    </div>
  )
}