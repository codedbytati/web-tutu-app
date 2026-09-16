import type { ComponentProps, SubmitEventHandler } from 'react'
import { TextAlignStartIcon } from 'lucide-react'
import { Button, CurrencyField, DateChecker, TextField } from '@tutu-ui'

type AddTransferFormProps = {
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onDescriptionProps: Omit<ComponentProps<typeof TextField>, 'label' | 'placeholder'>
  onDateProps: Omit<ComponentProps<typeof DateChecker>, 'label'>
  onValueProps: Omit<ComponentProps<typeof CurrencyField>, 'label'>
  onFromProps: Omit<ComponentProps<typeof TextField>, 'label' | 'placeholder'>
  onToProps: Omit<ComponentProps<typeof TextField>, 'label' | 'placeholder'>
  isPending?: boolean
}

export const AddTransferForm = ({
  onSubmit,
  onDescriptionProps,
  onDateProps,
  onValueProps,
  onFromProps,
  onToProps,
  isPending
}: AddTransferFormProps) => (
  <form className='flex flex-col gap-4' onSubmit={onSubmit}>
    <TextField label='Descrição' icon={TextAlignStartIcon} placeholder='Ex: Reserva mensal' {...onDescriptionProps} />
    <div className='grid grid-cols-2 gap-3'>
      <DateChecker label='Data da transação' {...onDateProps} />
      <CurrencyField label='Valor' type='transfer' {...onValueProps} />
    </div>
    <TextField label='Origem' placeholder='Ex: Conta corrente' {...onFromProps} />
    <TextField label='Destino' placeholder='Ex: Poupança' {...onToProps} />
    <Button type='submit' variant='primary' disabled={isPending}>
      {isPending ? 'Salvando...' : 'Salvar transferência'}
    </Button>
  </form>
)