import { Button, CurrencyField, DateChecker, Modal, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { ArrowUpDownIcon, TextAlignStartIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { AccountOptions } from '../AccountOptions'
import { useAddTransfer } from './core/useAddTransfer'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddTransfer = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  const { control, register, handleSubmit, onSubmit, isPending, isError } =
    useAddTransfer({ onClose: () => setIsModalOpen(false) })

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
              render={({ field }) => <CurrencyField label='Valor' type='transfer' value={field.value} onChange={field.onChange} required />}
            />
          </div>
          <Controller
            name='sourceId'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label='Conta de origem' value={field.value} onChange={field.onChange} required>
                <SelectItem value=''>Selecione uma conta</SelectItem>
                <AccountOptions />
              </Select>
            )}
          />
          <Controller
            name='destinationId'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label='Conta de destino' value={field.value} onChange={field.onChange} required>
                <SelectItem value=''>Selecione uma conta</SelectItem>
                <AccountOptions />
              </Select>
            )}
          />
          {isError && (
            <Text appearance='caption' className='text-negative'>Não foi possível registrar a transferência.</Text>
          )}
          <Button type='submit' variant='primary' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Confirmar transferência'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
