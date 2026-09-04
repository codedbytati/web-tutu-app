import { Modal, Text, TextField } from '@tutu-ui'
import { PlusCircleIcon, TextAlignStartIcon } from 'lucide-react'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddTransfer = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header onClose={() => setIsModalOpen(false)}>
        <div className='bg-primary/10 rounded-2xl p-2'>
          <PlusCircleIcon size={20} className='text-primary' />
        </div>
        <div>
          <Text appearance='h2' className='text-base font-bold font-display'>
            Nova transferência
          </Text>
          <Text appearance='caption' className='text-muted-foreground'>
            Mova valores entre suas contas
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <TextField
          label='Descrição'
          icon={TextAlignStartIcon}
          placeholder='Ex: Remuneração de agosto'
        />
        <div className='grid grid-cols-2 gap-3'>
          <TextField
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
          />
          <TextField
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
          />
        </div>
        <TextField
          label='Descrição'
          icon={TextAlignStartIcon}
          placeholder='Ex: Remuneração de agosto'
        />
        <TextField
          label='Descrição'
          icon={TextAlignStartIcon}
          placeholder='Ex: Remuneração de agosto'
        />
      </Modal.Body>
      <Modal.Footer primaryButtonLabel='Registrar receita' />
    </Modal>
  )
}
