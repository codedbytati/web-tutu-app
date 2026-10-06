import { Button, CurrencyField, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { bankOptions } from '../../../pages/utils'
import type { ComponentProps, SubmitEvent } from 'react'
import { TagIcon } from 'lucide-react'

type SelectFieldProps = Omit<ComponentProps<typeof Select>, 'label' | 'children'>
type TextFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'label' | 'placeholder'
>
type CurrencyFieldProps = Omit<ComponentProps<typeof CurrencyField>, 'label'>

type AddCreditCardFormProps = {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  bankProps: SelectFieldProps
  nicknameProps: TextFieldProps
  limitProps: CurrencyFieldProps
  errorMessage?: string
  isDisabled?: boolean
}

export const AddCreditCardForm = ({ onSubmit,
  bankProps,
  nicknameProps,
  limitProps,
  errorMessage,
  isDisabled }: AddCreditCardFormProps) => {
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
      <CurrencyField
        label='Limite total do cartão'
        type='transfer'
        inputMode='decimal'
        {...limitProps}
      />
      {errorMessage && (
        <Text appearance='caption' className='text-negative'>
          {errorMessage}
        </Text>
      )}
      <Button size='md' type='submit' disabled={isDisabled}>
        Adicionar cartão
      </Button>
    </form>
  )
}