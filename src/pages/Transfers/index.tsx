import { TextField } from '@tutu-ui/Form/TextField'
import { Modal } from '@tutu-ui/Modal'
import { PlusCircle } from 'lucide-react'

export const Transfers = () => {
  return (
    <Modal>
      <Modal.Header>
        <div className='bg-tutu-mint/10 rounded-2xl p-2'>
          <PlusCircle size={20} className='text-tutu-mint' />
        </div>
        <div>
          <h1 className='font-display font-bold text-base text-tutu-ink'>Nova receita</h1>
          <p className='text-xs text-tutu-muted'>Registre um valor recebido</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <TextField label='Valor' placeholder='R$ 0,00' />
      </Modal.Body>
    </Modal>
  )
}