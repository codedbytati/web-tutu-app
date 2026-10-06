import { useNavigate } from 'react-router'
import {
  ChevronRight,
  //   CircleQuestionMarkIcon,
  //   LockIcon,
  UserIcon,
  type LucideIcon
} from 'lucide-react'
import { Avatar, Button, Text } from '@tutu-ui'
import { ColoredCard } from '@tutu-components'
import { useAuth } from '../../../contexts/authContext'
import { Page } from '../../layouts/Page'
import { useState } from 'react'
import { EditProfileInfo } from './components/EditProfileInfo'

type ProfileButtonProps = {
  title: string
  description: string
  Icon: LucideIcon
  onClick: () => void
}

const ProfileButton = ({ title, description, Icon, onClick }: ProfileButtonProps) => {
  return (
    <button
      className='flex items-center justify-between py-3.5 px-4 rounded-2xl bg-card border border-border cursor-pointer hover:bg-muted'
      onClick={onClick}
    >
      <div className='flex gap-3'>
        <div className='bg-muted rounded-xl p-2'>
          <Icon size={20} />
        </div>
        <div>
          <Text className='font-semibold text-start font-display'>
            {title}
          </Text>
          <Text appearance='caption' className='text-muted-foreground '>
            {description}
          </Text>
        </div>
      </div>
      <ChevronRight size={16} className='text-muted-foreground' />
    </button>
  )
}

export const Profile = () => {
  const { loggedUser, logout } = useAuth()
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<'profile' | 'security' | 'help' | null>(null)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Page>
      <Page.Header>
        <Text appearance='h3' as='h1' className='font-bold'>
          Perfil
        </Text>
      </Page.Header>
      <Page.Body>
        {selectedOption === null && (<>
          <ColoredCard>
            <div className='flex items-center gap-4'>
              <Avatar
                size='xl'
                name={loggedUser?.displayName ?? ''}
                className='border-2 border-border/20'
              />
              <div>
                <Text appearance='h3' as='p' className='text-card'>
                  {loggedUser?.displayName ?? ''}
                </Text>
                <Text appearance='body2' className='text-card/70'>
                  {loggedUser?.email ?? ''}
                </Text>
              </div>
            </div>
          </ColoredCard>
          <div className='flex flex-col gap-4'>
            <ProfileButton
              title='Dados pessoais'
              description='Edite as suas informações pessoais'
              Icon={UserIcon}
              onClick={() => setSelectedOption('profile')}
            />
            {/* <ProfileButton
            title='Segurança'
            description='Gerencie a sua senha'
            Icon={LockIcon}
          />
          <ProfileButton
            title='Ajuda & Suporte'
            description='Central de ajuda, contato'
            Icon={CircleQuestionMarkIcon}
          /> */}
          </div>
          <Button
            size='md'
            className='bg-negative/10 border border-negative/15 text-negative'
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </>)}
        {selectedOption === 'profile' && <EditProfileInfo />}
      </Page.Body>
    </Page>
  )
}
