import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@tutu-ui/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

interface ModalFooterProps {
  primaryButtonLabel?: string
  onPrimaryButtonClick?: () => void
  secondaryButtonLabel?: string
  onSecondaryButtonClick?: () => void
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <dialog
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        className='w-1/3 m-auto flex flex-col rounded-2xl bg-card shadow-lg border border-border overflow-hidden p-0 text-foreground'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </dialog>
    </div>,
    document.body
  )
}

Modal.Header = function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <header className='w-full flex items-center justify-between px-5 py-4 border-b border-border'>
      <div className='flex items-center gap-3 font-semibold text-lg'>
        {children}
      </div>
      {onClose && (
        <button
          type='button'
          onClick={onClose}
          aria-label='Fechar'
          className='flex items-center p-2 size-8 rounded-full cursor-pointer hover:bg-muted group'
        >
          <X
            size={18}
            className='text-muted-foreground group-hover:text-foreground'
          />
        </button>
      )}
    </header>
  )
}

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return (
    <main className='w-full flex flex-col gap-4 p-5 overflow-y-auto'>
      {children}
    </main>
  )
}

Modal.Footer = function ModalFooter({
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  primaryButtonLabel
}: ModalFooterProps) {
  return (
    <footer className='w-full flex items-center justify-end gap-3 px-5 py-4 bg-muted/30 border-t border-border'>
      {secondaryButtonLabel && (
        <Button size='md' variant='danger' onClick={onSecondaryButtonClick}>
          {secondaryButtonLabel}
        </Button>
      )}
      <Button size='md' variant='positive' onClick={onPrimaryButtonClick}>
        {primaryButtonLabel}
      </Button>
    </footer>
  )
}
