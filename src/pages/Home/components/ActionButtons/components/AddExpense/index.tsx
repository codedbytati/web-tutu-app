import { MinusCircleIcon, TextAlignStartIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
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
    control,
    register,
    handleSubmit,
    onSubmit,
    isPending,
    isError
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
            icon={TextAlignStartIcon}
            label='Descrição'
            placeholder='Ex: Remuneração de agosto'
            {...register('description', { required: true })}
          />
          <div className='grid grid-cols-2 gap-3'>
            <DateChecker label='Data da transação' required {...register('date', { required: true })} />
            <Controller
              name='value'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CurrencyField label='Valor' type='expense' value={field.value} onChange={field.onChange} required />
              )}
            />
          </div>
          <Controller
            name='category'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label='Categoria' value={field.value} onChange={field.onChange} required>
                <SelectItem value=''>Selecione uma categoria</SelectItem>
                <SelectItem value='FOOD'>Alimentação</SelectItem>
                <SelectItem value='HOUSE'>Casa</SelectItem>
                <SelectItem value='TRANSPORT'>Transporte</SelectItem>
                <SelectItem value='EDUCATION'>Educação</SelectItem>
                <SelectItem value='HEALTH'>Saúde</SelectItem>
                <SelectItem value='LEISURE'>Lazer</SelectItem>
                <SelectItem value='OTHER'>Outros</SelectItem>
              </Select>
            )}
          />
          <Controller
            name='sourceId'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label='Conta' value={field.value} onChange={field.onChange} required>
                <SelectItem value=''>Selecione a conta</SelectItem>
                <AccountOptions />
              </Select>
            )}
          />
          {isError && (
            <Text appearance='caption' className='text-negative'>Não foi possível registrar a despesa.</Text>
          )}
          <Button type='submit' variant='danger' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrar despesa'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
