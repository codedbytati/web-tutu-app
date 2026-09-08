import { Button, CurrencyField, DateChecker, Modal, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { ArrowUpDownIcon, TextAlignStartIcon } from 'lucide-react'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddTransfer = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  return (
    <Modal isOpen={isModalOpen}>
      <Modal.Header onClose={() => setIsModalOpen(false)}>
        <div className='bg-primary/10 rounded-2xl p-2'>
          <ArrowUpDownIcon size={20} className='text-primary' />
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
        <form className='flex flex-col gap-4'>
          <TextField
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
          />
          <div className='grid grid-cols-2 gap-3'>
            <DateChecker label='Data da transação' />
            <CurrencyField label='Valor' type='transfer' />
          </div>
          <Select label='Conta de origem' placeholder='Selecione uma conta'>
            <SelectItem value='1'>Conta corrente</SelectItem>
            <SelectItem value='2'>Cartão de crédito</SelectItem>
          </Select>
          <Select label='Conta de destino' placeholder='Selecione uma conta'>
            <SelectItem value='1'>Conta corrente</SelectItem>
            <SelectItem value='2'>Cartão de crédito</SelectItem>
          </Select>
          <Button type='submit' variant='primary'>Confirmar transferência</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
