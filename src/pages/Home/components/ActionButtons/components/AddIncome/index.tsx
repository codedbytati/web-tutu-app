import {
  Button,
  CurrencyField,
  DateChecker,
  Modal,
  Select,
  Text,
  TextField
} from '@tutu-ui'
import { SelectItem } from '@tutu-ui/Form/Select'
import { PlusCircleIcon, TextAlignStartIcon } from 'lucide-react'
import { AccountOptions } from '../AccountOptions'
import { useAddIncome } from './core/useAddIncome'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddIncome = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  const {
    isPending,
    onDescriptionProps,
    onDateProps,
    onValueProps,
    onCategoryProps,
    onSourceIdProps,
    handleSubmit,
    onSubmit
  } =
    useAddIncome({ onClose: () => setIsModalOpen(false) })

  return (
    <Modal isOpen={isModalOpen}>
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
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
            {...onDescriptionProps}
          />
          <div className='grid grid-cols-2 gap-3'>
            <DateChecker label='Data da transação' {...onDateProps} />
            <CurrencyField label='Valor' type='income' {...onValueProps} />
          </div>
          <Select label='Categoria' {...onCategoryProps}>
            <SelectItem value=''>Selecione uma categoria</SelectItem>
            <SelectItem value='SALARY'>Salário</SelectItem>
            <SelectItem value='INVESTIMENT'>Investimentos</SelectItem>
            <SelectItem value='SAVINGS'>Poupança</SelectItem>
            <SelectItem value='OTHER'>Outros</SelectItem>
          </Select>
          <Select label='Conta' {...onSourceIdProps}>
            <SelectItem value=''>Selecione a conta</SelectItem>
            <AccountOptions />
          </Select>
          <Button type='submit' variant='positive' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrar receita'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
