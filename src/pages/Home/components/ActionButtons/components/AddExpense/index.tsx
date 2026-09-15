import { MinusCircleIcon, TextAlignStartIcon } from 'lucide-react'
import { useAddExpense } from './core/useAddExpense'
import {
  Button,
  CurrencyField,
  DateChecker,
  Modal,
  Select,
  SelectItem,
  Text,
  TextField
} from '@tutu-ui'
import { AccountOptions } from '../AccountOptions'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddExpense = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  const {
    handleSubmit,
    onSubmit,
    onDescriptionProps,
    onDateProps,
    onValueProps,
    onCategoryProps,
    onSourceIdProps,
    isPending
  } = useAddExpense({ onClose: () => setIsModalOpen(false) })

  return (
    <Modal isOpen={isModalOpen}>
      <Modal.Header onClose={() => setIsModalOpen(false)}>
        <div className='bg-negative/10 rounded-2xl p-2'>
          <MinusCircleIcon size={20} className='text-negative' />
        </div>
        <div>
          <Text appearance='h2' className='text-base font-bold font-display'>
            Nova despesa
          </Text>
          <Text appearance='caption' className='text-muted-foreground'>
            Registre um valor gasto
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
            <CurrencyField label='Valor' type='expense' {...onValueProps} />
          </div>
          <Select label='Categoria' {...onCategoryProps}>
            <SelectItem value=''>Selecione uma categoria</SelectItem>
            <SelectItem value='FOOD'>Alimentação</SelectItem>
            <SelectItem value='HOUSE'>Casa</SelectItem>
            <SelectItem value='TRANSPORT'>Transporte</SelectItem>
            <SelectItem value='EDUCATION'>Educação</SelectItem>
            <SelectItem value='HEALTH'>Saúde</SelectItem>
            <SelectItem value='LEISURE'>Lazer</SelectItem>
            <SelectItem value='OTHER'>Outros</SelectItem>
          </Select>
          <Select label='Conta' {...onSourceIdProps}>
            <SelectItem value=''>Selecione a conta</SelectItem>
            <AccountOptions />
          </Select>
          <Button type='submit' variant='positive' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrar despesa'}
          </Button>
        </form>
      </Modal.Body>
    </Modal >
  )
}
