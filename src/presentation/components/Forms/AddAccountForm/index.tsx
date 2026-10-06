import type { ComponentProps, SubmitEventHandler } from 'react'
import { TagIcon } from 'lucide-react'
import { Button, CurrencyField, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { bankOptions } from '../../../pages/utils'

type SelectFieldProps = Omit<ComponentProps<typeof Select>, 'label' | 'children'>
type TextFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'label' | 'placeholder'
>
type CurrencyFieldProps = Omit<ComponentProps<typeof CurrencyField>, 'label'>

type AddAccountFormProps = {
  onSubmit: SubmitEventHandler<HTMLFormElement>
  bankProps: SelectFieldProps
  nicknameProps: TextFieldProps
  typeProps: SelectFieldProps
  balanceProps: CurrencyFieldProps
  errorMessage?: string
  isDisabled?: boolean
}

export const AddAccountForm = ({
  bankProps,
  nicknameProps,
  typeProps,
  balanceProps,
  errorMessage,
  isDisabled,
  onSubmit
}: AddAccountFormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <Select
        label='Banco ou instituição'
        {...bankProps}
      >
        <SelectItem value=''>Selecione um banco</SelectItem>
        {bankOptions.map(([value, pattern]) => (
          <SelectItem key={value} value={value}>
            {pattern.name}
          </SelectItem>
        ))}
      </Select>
      <TextField
        label='Apelido'
        icon={TagIcon}
        placeholder='Ex: Principal, Viagens...'
        {...nicknameProps}
      />
      <Select
        label='Tipo da conta'
        {...typeProps}
      >
        <SelectItem value=''>Selecione um tipo</SelectItem>
        <SelectItem value='CURRENT'>Corrente</SelectItem>
        <SelectItem value='SAVINGS'>Poupança</SelectItem>
        <SelectItem value='INVESTMENT'>Investimento</SelectItem>
      </Select>
      <CurrencyField
        label='Saldo inicial'
        type='transfer'
        inputMode='decimal'
        {...balanceProps}
      />
      {errorMessage && (
        <Text appearance='caption' className='text-negative'>
          {errorMessage}
        </Text>
      )}
      <Button variant='positive' size='md' type='submit' disabled={isDisabled}>
        Adicionar conta
      </Button>
    </form>
  )
}