import { useForm, type SubmitHandler } from 'react-hook-form'
import { ChevronLeftIcon } from 'lucide-react'
import { Modal, Text } from '@tutu-ui'
import { useCreateAccount } from '@tutu-services/account'
import { AddAccountForm } from '@tutu-components'
import { type AccountType, type Bank } from '../../../../utils'

type NewAccountProps = {
  isOpen: boolean
  onClose: () => void
  onReturn: () => void
}

type AccountFormData = {
  bank: Bank | ''
  nickname: string
  type: AccountType | ''
  balance: string
}

export const NewAccount = ({ isOpen, onClose, onReturn }: NewAccountProps) => {
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
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={onClose}>
        <button className='cursor-pointer p-1 rounded-lg hover:bg-muted' onClick={onReturn}>
          <ChevronLeftIcon size={16} className='text-muted-foreground' />
        </button>
        <div>
          <Text appearance='h2' className='font-bold text-base'>
            Nova conta
          </Text>
          <Text
            appearance='caption'
            className='text-muted-foreground text-[11px]'
          >
            Cadastre os dados essenciais da sua conta
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  )
}
