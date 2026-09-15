import { Button, CurrencyField, DateChecker, Modal, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { ArrowUpDownIcon, TextAlignStartIcon } from 'lucide-react'
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
  const {
    handleSubmit,
    onSubmit,
    isPending,
    onDescriptionProps,
    onDateProps,
    onValueProps,
    onOriginProps,
    onDestinationProps
  } = useAddTransfer({ onClose: () => setIsModalOpen(false) })

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
            label='Descrição'
            icon={TextAlignStartIcon}
            placeholder='Ex: Remuneração de agosto'
            {...onDescriptionProps}
          />
          <div className='grid grid-cols-2 gap-3'>
            <DateChecker label='Data da transação' {...onDateProps} />
            <CurrencyField label='Valor' type='transfer' {...onValueProps} />
          </div>
          <Select label='Conta de origem' {...onOriginProps}>
            <SelectItem value=''>Selecione uma conta</SelectItem>
            <AccountOptions />
          </Select>
          <Select label='Conta de destino' {...onDestinationProps}>
            <SelectItem value=''>Selecione uma conta</SelectItem>
            <AccountOptions />
          </Select>
          <Button type='submit' variant='primary' disabled={isPending}>
            {isPending ? 'Registrando...' : 'Confirmar transferência'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
