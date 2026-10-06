import { Button, Text } from '@tutu-ui'
import { ChevronLeft } from 'lucide-react'

export const EditProfileInfo = () => {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <div className='bg-muted rounded-2xl p-2'>
          <ChevronLeft size={16} />
        </div>
        <div>
          <Text appearance='h1' className='text-lg font-bold'>Dados pessoais</Text>
          <Text appearance='body1' className='text-muted-foreground text-xs'>
            Suas informações pessoais
          </Text>
        </div>
      </div>
      <hr className='text-border mt-4 mb-5' />
      <div className='bg-card px-4 rounded-2xl'>
        <div className='flex items-center justify-between border-b border-b-border py-3.5'>
          <Text appearance='body2' className='text-muted-foreground'>
            Nome completo
          </Text>
          <Text appearance='body1' className='font-display font-semibold'>Maria Silva</Text>
        </div>
        <div className='flex items-center justify-between border-b border-b-border py-3.5'>
          <Text appearance='body2' className='text-muted-foreground'>
            Endereço de e-mail
          </Text>
          <Text appearance='body1' className='font-display font-semibold'>maria@email.com</Text>
        </div>
        <div className='flex items-center justify-between py-3.5'>
          <Text appearance='body2' className='text-muted-foreground'>
            Data de nascimento
          </Text>
          <Text appearance='body1' className='font-display font-semibold'>01/02/2000</Text>
        </div>
      </div>
      <Button variant='ghost' className='w-full mt-4'>Editar informações</Button>
    </div>
  )
}