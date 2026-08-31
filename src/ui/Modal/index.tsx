import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@tutu-ui/Button'

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="w-1/3 flex flex-col items-center rounded-2xl bg-tutu-card shadow-lg overflow-hidden">
      {children}
    </div>
  )
}

Modal.Header = function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <div className='w-full flex items-center justify-between px-5 py-3 border-b border-b-tutu-border'>
      <div className='flex items-center gap-3'>
        {children}
      </div>
      <button onClick={onClose}>
        <X size={16} className='text-tutu-muted' />
      </button>
    </div>
  )
}

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex flex-col gap-4 p-5'>
      {children}
      <Button size='lg' variant='positive'>Confirmar</Button>
    </div>
  )
}

// export const Modal = () => {
//   return (
//     <div className='w-1/3 flex flex-col items-center rounded-2xl bg-tutu-card shadow-lg'>
//       <div className='w-full flex items-center justify-between px-5 py-3 border-b border-b-tutu-border'>
//         <div className='flex items-center gap-3'>
//           <div className='bg-tutu-mint/10 rounded-2xl p-2'>
//             <PlusCircle size={20} className='text-tutu-mint' />
//           </div>
//           <div>
//             <h1 className='font-display font-bold text-base text-tutu-ink'>Nova receita</h1>
//             <p className='text-xs text-tutu-muted'>Registre um valor recebido</p>
//           </div>
//         </div>
//         <button>
//           <X size={16} className='text-tutu-muted' />
//         </button>
//       </div>
//       <div className='w-full flex flex-col gap-4 p-5'>
//         <TextField label='Valor' placeholder='R$ 0,00' />
//         <Button size='lg' variant='positive'>Confirmar</Button>
//       </div>
//     </div>
//   )
// }