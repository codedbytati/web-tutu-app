import { Modal, Text } from '@tutu-ui'
import { ChevronRight, CreditCardIcon, LandmarkIcon } from 'lucide-react'
import { useState } from 'react'
import { NewCreditCard } from './components/NewCreditCard'
import { NewAccount } from './components/NewAccount'

type AddAccountCardProps = {
  isOpen: boolean
  onClose: () => void
}

export const AddAccountCard = ({ isOpen, onClose }: AddAccountCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<'credit' | 'account' | null>(
    null
  )

  const returnToMenu = () => setIsModalOpen(null)
  const closeAllModals = () => {
    setIsModalOpen(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={closeAllModals}>
        <div>
          <Text appearance='h2' className='font-bold text-base'>
            O que deseja adicionar?
          </Text>
          <Text
            appearance='caption'
            className='text-muted-foreground text-[11px]'
          >
            Escolha o tipo antes de continuar
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <button
          onClick={() => setIsModalOpen('credit')}
          className='flex items-center justify-between border border-border rounded-2xl p-4 cursor-pointer hover:bg-muted hover:border hover:border-primary group'
        >
          <div className='flex items-center gap-4'>
            <div className='bg-primary/10 rounded-2xl p-2'>
              <CreditCardIcon size={22} className='text-primary' />
            </div>
            <div className='flex flex-col items-start'>
              <Text className='font-display font-bold '>Cartão de crédito</Text>
              <Text appearance='caption' className='text-muted-foreground'>
                Acompanhe limites e gastos
              </Text>
            </div>
          </div>
          <button>
            <ChevronRight size={16} className='text-muted-foreground group-hover:text-accent-foreground' />
          </button>
        </button>
        <button
          className='flex items-center justify-between border border-border rounded-2xl p-4 cursor-pointer hover:bg-muted hover:border hover:border-primary group'
          onClick={() => setIsModalOpen('account')}
        >
          <div className='flex items-center gap-4'>
            <div className='bg-positive/10 rounded-2xl p-2'>
              <LandmarkIcon size={22} className='text-positive' />
            </div>
            <div className='flex flex-col items-start'>
              <Text className='font-display font-bold '>Conta bancária</Text>
              <Text appearance='caption' className='text-muted-foreground'>
                Conta corrente, poupança ou investimentos
              </Text>
            </div>
          </div>
          <button>
            <ChevronRight size={16} className='text-muted-foreground group-hover:text-accent-foreground' />
          </button>
        </button>
      </Modal.Body>
      <NewCreditCard
        isOpen={isModalOpen === 'credit'}
        onReturn={returnToMenu}
        onClose={closeAllModals}
      />
      <NewAccount
        isOpen={isModalOpen === 'account'}
        onReturn={returnToMenu}
        onClose={closeAllModals}
      />
    </Modal>
  )
}
