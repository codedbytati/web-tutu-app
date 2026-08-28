import { Mail, User } from 'lucide-react'
import Logo from '../../../public/logo.png'
import GoogleSVG from '../../../public/google.svg'
import { Button, PasswordField, TextField } from '@tutu-ui'

export const Register = () => {
  return (
    <div className='bg-tutu-surface flex flex-col items-center justify-center h-screen'>
      <div className='absolute -top-1/2 left-1/2 -translate-x-1/2 size-150 bg-tutu-violet opacity-5 rounded-full'></div>

      <div className='flex flex-col items-center'>
        <img src={Logo} alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco' />
        <h1 className='text-tutu-ink text-2xl font-black font-display pb-1'>Crie sua conta</h1>
        <p className='text-tutu-muted text-sm'>Comece a organizar a sua vida financeira</p>
      </div>

      <div className='w-1/4 flex flex-col items-center bg-tutu-card relative rounded-2xl p-6 mt-6 shadow-lg'>
        <button className='w-full rounded-4xl py-3 border-2 border-tutu-border flex items-center justify-center gap-3 shadow-md cursor-pointer'>
          <img src={GoogleSVG} alt='Ícone do Google' className='size-4' />
          <p className='text-tutu-ink text-sm font-semibold'>Registrar com Google</p>
        </button>

        <div className='flex items-center gap-2 my-4'>
          <hr className='text-tutu-border w-34' />
          <p className='text-tutu-muted text-xs'>ou</p>
          <hr className='text-tutu-border w-34' />
        </div>
        
        <div className='flex flex-col gap-4 w-full'>
          <TextField label='Nome completo' placeholder='Digite seu nome completo' icon={User} />
          <TextField label='E-mail' placeholder='Digite seu e-mail' icon={Mail} />
          <PasswordField
            label='Senha'
            placeholder='Digite sua senha'
            hint='A senha deve ter pelo menos 6 caracteres'
          />
          <Button size='lg'>Criar conta</Button>
        </div>
      </div>
      <p className='text-tutu-muted text-sm my-6'>Já tem uma conta? <a href='#' className='text-tutu-violet font-semibold'>Entrar</a></p>
    </div>
  )
}