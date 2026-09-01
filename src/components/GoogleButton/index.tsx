import GoogleSVG from '../../assets/google.svg'

type GoogleButtonProps = {
  onClick: () => void;
  isLogin?: boolean;
};

export const GoogleButton = ({ onClick, isLogin = false }: GoogleButtonProps) => {

  return (
    <button
      type='button'
      onClick={onClick}
      className='w-full rounded-4xl py-3 border-2 border-border flex items-center justify-center gap-3 shadow-md cursor-pointer'
    >
      <img src={GoogleSVG} alt='Ícone do Google' className='size-4' />
      <p className='text-foreground text-sm font-semibold'>
        {isLogin ? 'Entrar com Google' : 'Registrar com Google'}
      </p>
    </button>
  )
}