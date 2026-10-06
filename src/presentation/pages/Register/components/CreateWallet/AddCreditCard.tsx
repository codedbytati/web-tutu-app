import { useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ChevronLeftIcon } from 'lucide-react'
import { Text } from '@tutu-ui'
import { AddCreditCardForm } from '@tutu-components'
import { useCreateCreditCard } from '@tutu-services/account'
import Logo from '../../../../../assets/logo.png'
import type { Bank } from '../../../utils'

type AddCreditCardProps = {
  onClose: () => void
}

type CreditCardFormData = {
  bank: string
  nickname: string
  limit: string
}

export const AddCreditCard = ({ onClose }: AddCreditCardProps) => {
  const navigate = useNavigate()
  const { mutate, isError, isPending } = useCreateCreditCard()
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: { bank: '', nickname: '', limit: '' }
  })

  const onSubmit: SubmitHandler<CreditCardFormData> = (data) => {
    const parsedLimit = Number(data.limit.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(parsedLimit)) return

    mutate(
      {
        bank: data.bank as Bank,
        nickname: data.nickname.trim(),
        limit: parsedLimit
      },
      {
        onSuccess: () => {
          reset()
          navigate('/')
        }
      }
    )
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 mb-8'>
        <img
          src={Logo}
          alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco'
        />
        <h1 className='font-display font-black text-foreground'>tutu</h1>
      </div>
      <button className='flex items-center gap-2 cursor-pointer group' onClick={onClose}>
        <div className='bg-muted rounded-xl p-2'>
          <ChevronLeftIcon size={14} className='text-muted-foreground group-hover:text-foreground' />
        </div>
        <Text appearance='body2' className='text-muted-foreground font-semibold group-hover:text-foreground'>Voltar</Text>
      </button>
      <div className='mt-6 mb-5'>
        <Text appearance='h1' className='text-2xl font-extrabold'>Adicionar conta</Text>
        <Text appearance='body1' className='text-muted-foreground text-sm'>
          Você pode adicionar mais contas depois.
        </Text>
      </div>
      <AddCreditCardForm
        onSubmit={handleSubmit(onSubmit)}
        bankProps={{
          ...register('bank', { required: 'Selecione um banco' }),
          isInvalid: Boolean(errors.bank),
          errorMessage: errors.bank?.message
        }}
        nicknameProps={{
          ...register('nickname', { required: 'Informe um apelido' }),
          isInvalid: Boolean(errors.nickname),
          errorMessage: errors.nickname?.message
        }}
        limitProps={{
          ...register('limit', { required: 'Informe o limite' }),
          isInvalid: Boolean(errors.limit),
          errorMessage: errors.limit?.message
        }}
        errorMessage={
          isError
            ? 'Não foi possível adicionar o cartão de crédito.'
            : undefined
        }
        isDisabled={isPending}
      />
    </div>
  )
}