import { Link } from 'react-router'
import { Mail, User } from 'lucide-react'
import { Button, PasswordField, TextField } from '@tutu-ui'
import { GoogleButton } from '@tutu-components'
import Logo from '../../assets/logo.png'
import { useRegister } from './core/useRegister'

export const Register = () => {
  const { onSubmit, onNameProps, onEmailProps, onPasswordProps, onGoogleRegister } = useRegister()

  return (
    <div className='bg-background flex flex-col items-center justify-center h-screen'>
      <div className='absolute -top-1/2 left-1/2 -translate-x-1/2 size-150 bg-primary opacity-5 rounded-full'></div>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco' />
        <h1 className='text-foreground text-2xl font-black font-display pb-1'>Crie sua conta</h1>
        <p className='text-muted-foreground text-sm'>Comece a organizar a sua vida financeira</p>
      </div>
      <div className='w-1/4 flex flex-col items-center bg-card relative rounded-2xl p-6 mt-6 shadow-lg'>
        <GoogleButton onClick={onGoogleRegister} />
        <div className='flex items-center gap-2 my-4'>
          <hr className='text-border w-34' />
          <p className='text-muted-foreground text-xs'>ou</p>
          <hr className='text-border w-34' />
        </div>
        <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full' noValidate>
          <TextField
            label='Nome completo' placeholder='Digite seu nome completo'
            icon={User}
            required
            {...onNameProps}
          />
          <TextField
            label='E-mail' placeholder='Digite seu e-mail'
            icon={Mail}
            required
            {...onEmailProps}
          />
          <PasswordField
            label='Senha'
            placeholder='Digite sua senha'
            hint='A senha deve ter pelo menos 6 caracteres'
            required
            {...onPasswordProps}
          />
          <Button size='lg' type='submit'>Criar conta</Button>
        </form>
      </div>
      <p className='text-muted-foreground text-sm my-6'>Já tem uma conta?
        <Link to='/login' className='text-primary font-semibold'> Entrar</Link>
      </p>
    </div>
  )
}