import type { ComponentProps, SubmitEventHandler } from 'react'
import { TextAlignStartIcon } from 'lucide-react'
import {
  Button,
  CurrencyField,
  DateChecker,
  Select,
  SelectItem,
  TextField
} from '@tutu-ui'
import { AccountOptions } from '../AccountOptions'

type SelectFieldProps = Omit<ComponentProps<typeof Select>, 'label' | 'children'>
type CurrencyFieldProps = Omit<ComponentProps<typeof CurrencyField>, 'label'>

type AddExpenseFormProps = {
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onDescriptionProps: Omit<ComponentProps<typeof TextField>, 'label' | 'placeholder'>
  onDateProps: Omit<ComponentProps<typeof DateChecker>, 'label'>
  onValueProps: CurrencyFieldProps
  onCategoryProps: SelectFieldProps
  onSourceIdProps: SelectFieldProps
  isPending?: boolean
}

export const AddExpenseForm = ({
  onSubmit,
  onDescriptionProps,
  onDateProps,
  onValueProps,
  onCategoryProps,
  onSourceIdProps,
  isPending
}: AddExpenseFormProps) => {
  return (
    <form className='flex flex-col gap-4' onSubmit={onSubmit}>
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
  )
}