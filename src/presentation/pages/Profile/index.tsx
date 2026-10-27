import { useNavigate } from 'react-router'
import { Avatar, Button, Text } from '@tutu-ui'
import { ColoredCard } from '@tutu-components'
import { useAuth } from '../../../contexts/authContext'
import { Page } from '../../layouts/Page'

export const Profile = () => {
  const { loggedUser, logout } = useAuth()
  const navigate = useNavigate()

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
        <Button
          size='md'
          className='bg-negative/10 border border-negative/15 text-negative'
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </Page.Body>
    </Page>
  )
}
