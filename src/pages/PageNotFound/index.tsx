import { FileQuestionMarkIcon } from 'lucide-react'

export const PageNotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center'>
      <div>
        <FileQuestionMarkIcon size={64} className='text-tutu-muted' />
        <h1 className='font-display text-3xl font-bold text-tutu-ink'>Página não encontrada</h1>
        <p className='text-tutu-muted'>Você será redirecionado em instantes...</p>
      </div>
    </div>
  )
}