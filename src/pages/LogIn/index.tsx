import { Link } from 'react-router'
import { Mail } from 'lucide-react'
import Logo from '../../assets/logo.png'
import GoogleSVG from '../../assets/google.svg'
import { Button, PasswordField, TextField } from '@tutu-ui'

export const LogIn = () => {
  return (
    <div className='bg-background flex flex-col items-center justify-center h-screen'>
      <div className='absolute -top-1/2 left-1/2 -translate-x-1/2 size-150 bg-primary opacity-5 rounded-full'></div>

      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco' />
        <h1 className='text-foreground text-2xl font-black font-display pb-1'>Bom te ver de volta!</h1>
        <p className='text-muted-foreground text-sm'>Entre para acessar suas finanças.</p>
      </div>

      <div className='w-1/4 flex flex-col items-center bg-card relative rounded-2xl p-6 mt-6 shadow-lg'>
        <button className='w-full rounded-4xl py-3 border-2 border-border flex items-center justify-center gap-3 shadow-md cursor-pointer'>
          <img src={GoogleSVG} alt='Ícone do Google' className='size-4' />
          <p className='text-foreground text-sm font-semibold'>Entrar com Google</p>
        </button>

        <div className='flex items-center gap-2 my-4'>
          <hr className='text-border w-34' />
          <p className='text-muted-foreground text-xs'>ou</p>
          <hr className='text-border w-34' />
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <TextField label='E-mail' placeholder='nome@email.com' icon={Mail} />
          <PasswordField
            label='Senha'
            placeholder='Digite sua senha'
          />
          <Button size='lg'>Entrar</Button>
        </div>
      </div>
      <p className='text-muted-foreground text-sm my-6'>Não tem uma conta?
        <Link to='/register' className='text-primary font-semibold'> Criar conta</Link>
      </p>
    </div>
  )
}