import { useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ChevronLeftIcon } from 'lucide-react'
import { Text } from '@tutu-ui'
import { AddAccountForm } from '@tutu-components'
import { useCreateAccount } from '@tutu-services/account'
import type { AccountType, Bank } from '../../../utils'
import Logo from '../../../../../assets/logo.png'

type AccountFormData = {
  bank: Bank | ''
  nickname: string
  type: AccountType | ''
  balance: string
}

type AddAccountProps = {
  onClose: () => void
}

export const AddAccount = ({ onClose }: AddAccountProps) => {
  const navigate = useNavigate()
  const { mutate, isError, isPending } = useCreateAccount()
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<AccountFormData>({
    defaultValues: { bank: '', nickname: '', type: '', balance: '' }
  })

  const onSubmit: SubmitHandler<AccountFormData> = (data) => {
    const parsedBalance = Number(data.balance.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(parsedBalance)) return

    mutate(
      {
        bank: data.bank as Bank,
        nickname: data.nickname.trim(),
        type: data.type as AccountType,
        balance: parsedBalance
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
      <AddAccountForm
        onSubmit={handleSubmit(onSubmit)}
        bankProps={{
          ...register('bank', { required: 'Selecione um banco.' }),
          isInvalid: Boolean(errors.bank),
          errorMessage: errors.bank?.message
        }}
        nicknameProps={{
          ...register('nickname', { required: 'Informe um apelido.' }),
          isInvalid: Boolean(errors.nickname),
          errorMessage: errors.nickname?.message
        }}
        typeProps={{
          ...register('type', { required: 'Selecione o tipo da conta.' }),
          isInvalid: Boolean(errors.type),
          errorMessage: errors.type?.message
        }}
        balanceProps={{
          ...register('balance', { required: 'Informe o saldo inicial.' }),
          isInvalid: Boolean(errors.balance),
          errorMessage: errors.balance?.message
        }}
        errorMessage={
          isError
            ? 'Não foi possível adicionar a conta.'
            : undefined
        }
        isDisabled={isPending}
      />
    </div>
  )
}