import { TextField } from '@tutu-ui/Form/TextField'
import { Modal } from '@tutu-ui/Modal'
import { PlusCircle } from 'lucide-react'

export const Transfers = () => {
  return (
    <Modal>
      <Modal.Header>
        <div className='bg-positive/10 rounded-2xl p-2'>
          <PlusCircle size={20} className='text-positive' />
        </div>
        <div>
          <h1 className='font-display font-bold text-base text-foreground'>Nova receita</h1>
          <p className='text-xs text-muted-foreground'>Registre um valor recebido</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <TextField label='Valor' placeholder='R$ 0,00' />
      </Modal.Body>
    </Modal>
  )
}