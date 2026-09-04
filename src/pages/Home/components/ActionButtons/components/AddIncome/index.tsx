import {
  CurrencyField,
  DateChecker,
  Modal,
  Select,
  Text,
  TextField
} from '@tutu-ui'
import { SelectItem } from '@tutu-ui/Form/Select'
import { PlusCircleIcon, TextAlignStartIcon } from 'lucide-react'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddIncome = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header onClose={() => setIsModalOpen(false)}>
        <div className='bg-positive/10 rounded-2xl p-2'>
          <PlusCircleIcon size={20} className='text-positive' />
        </div>
        <div>
          <Text appearance='h2' className='text-base font-bold font-display'>
            Nova receita
          </Text>
          <Text appearance='caption' className='text-muted-foreground'>
            Registre um valor recebido
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
          <DateChecker label='Data da transação' />
          <CurrencyField label='Valor' />
        </div>
        <Select label='Categoria' placeholder='Selecione uma categoria'>
          <SelectItem value='1'>Salário</SelectItem>
          <SelectItem value='2'>Investimentos</SelectItem>
          <SelectItem value='3'>Outros</SelectItem>
        </Select>
        <Select label='Conta' placeholder='Selecione a conta'>
          <SelectItem value='1'>Conta corrente</SelectItem>
          <SelectItem value='2'>Cartão de crédito</SelectItem>
        </Select>
      </Modal.Body>
      <Modal.Footer primaryButtonLabel='Registrar receita' />
    </Modal>
  )
}
