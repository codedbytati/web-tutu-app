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

type AddIncomeFormProps = {
  onSubmit: SubmitEventHandler<HTMLFormElement>
  onDescriptionProps: Omit<ComponentProps<typeof TextField>, 'label' | 'placeholder'>
  onDateProps: Omit<ComponentProps<typeof DateChecker>, 'label'>
  onValueProps: Omit<ComponentProps<typeof CurrencyField>, 'label'>
  onCategoryProps: Omit<ComponentProps<typeof Select>, 'label' | 'children'>
  onSourceIdProps: Omit<ComponentProps<typeof Select>, 'label' | 'children'>
  isPending?: boolean
}

export const AddIncomeForm = ({
  onSubmit,
  onDescriptionProps,
  onDateProps,
  onValueProps,
  onCategoryProps,
  onSourceIdProps,
  isPending
}: AddIncomeFormProps) => (
  <form className='flex flex-col gap-4' onSubmit={onSubmit}>
    <TextField label='Descrição' icon={TextAlignStartIcon} placeholder='Ex: Salário' {...onDescriptionProps} />
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
      {isPending ? 'Salvando...' : 'Salvar receita'}
    </Button>
  </form>
)