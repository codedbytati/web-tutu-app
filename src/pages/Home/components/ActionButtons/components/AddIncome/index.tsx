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
import { Controller } from 'react-hook-form'
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
  const { control, register, handleSubmit, onSubmit, isPending, isError } =
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
            {...register('description', { required: true })}
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
          />
          <div className='grid grid-cols-2 gap-3'>
            <DateChecker label='Data da transação' required {...register('date', { required: true })} />
            <Controller
              name='value'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <CurrencyField label='Valor' type='income' value={field.value} onChange={field.onChange} required />}
            />
          </div>
          <Controller
            name='category'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label='Categoria' value={field.value} onChange={field.onChange} required>
                <SelectItem value=''>Selecione uma categoria</SelectItem>
                <SelectItem value='SALARY'>Salário</SelectItem>
                <SelectItem value='INVESTIMENT'>Investimentos</SelectItem>
                <SelectItem value='SAVINGS'>Poupança</SelectItem>
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
            <Text appearance='caption' className='text-negative'>Não foi possível registrar a receita.</Text>
          )}
          <Button type='submit' variant='positive' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrar receita'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
