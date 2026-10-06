import { FileQuestionMarkIcon } from 'lucide-react'

export const PageNotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center'>
      <div>
        <FileQuestionMarkIcon size={64} className='text-muted-foreground' />
        <h1 className='font-display text-3xl font-bold text-foreground'>
          Página não encontrada
        </h1>
        <p className='text-muted-foreground'>
          Você será redirecionado em instantes...
        </p>
      </div>
    </div>
  )
}
