import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@tutu-ui/Button'

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-1/3 flex flex-col items-center rounded-2xl bg-card shadow-lg overflow-hidden">
      {children}
    </div>
  )
}

Modal.Header = function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <div className='w-full flex items-center justify-between px-5 py-3 border-b border-b-border'>
      <div className='flex items-center gap-3'>
        {children}
      </div>
      <button onClick={onClose}>
        <X size={16} className='text-muted-foreground' />
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
