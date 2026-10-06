import { Link } from 'react-router'
import { Mail } from 'lucide-react'
import { Button, PasswordField, TextField } from '@tutu-ui'
import { GoogleButton } from '@tutu-components'
import { useLoginUser } from './core/useLoginUser'
import Logo from '../../../assets/logo.png'

export const LogIn = () => {
  const { onSubmit, onGoogleRegister, isLoginError, onEmailProps, onPasswordProps } =
    useLoginUser()

  return (
    <div className='bg-background flex flex-col items-center justify-center h-screen'>
      <div className='absolute -top-1/2 left-1/2 -translate-x-1/2 size-150 bg-primary opacity-5 rounded-full'></div>
      <div className='flex flex-col items-center'>
        <img
          src={Logo}
          alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco'
        />
        <h1 className='text-foreground text-2xl font-black font-display pb-1'>
          Bom te ver de volta!
        </h1>
        <p className='text-muted-foreground text-sm'>
          Entre para acessar suas finanças.
        </p>
      </div>
      <div className='w-1/4 flex flex-col items-center bg-card relative rounded-2xl p-6 mt-6 shadow-lg'>
        <GoogleButton onClick={onGoogleRegister} isLogin />
        <div className='flex items-center gap-2 my-4'>
          <hr className='text-border w-34' />
          <p className='text-muted-foreground text-xs'>ou</p>
          <hr className='text-border w-34' />
        </div>
        <form
          onSubmit={onSubmit}
          noValidate
          className='flex flex-col gap-4 w-full'
        >
          <TextField
            label='E-mail'
            placeholder='nome@email.com'
            icon={Mail}
            {...onEmailProps}
          />
          <PasswordField
            label='Senha'
            placeholder='Digite sua senha'
            {...onPasswordProps}
          />
          {isLoginError && (
            <p className='text-negative text-xs'>
              Não foi possível realizar o login no momento. Verifique suas credenciais e tente novamente.
            </p>
          )}
          <Button size='lg' type='submit'>
            Entrar
          </Button>
        </form>
      </div>
      <p className='text-muted-foreground text-sm my-6'>
        Não tem uma conta?
        <Link to='/cadastro' className='text-primary font-semibold'>
          {' '}
          Criar conta
        </Link>
      </p>
    </div>
  )
}
