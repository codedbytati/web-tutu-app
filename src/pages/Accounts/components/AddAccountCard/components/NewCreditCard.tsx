import { ChevronLeftIcon } from 'lucide-react'
import { Modal, Text } from '@tutu-ui'
import { AddCreditCardForm } from '@tutu-components'
import { useCreateCreditCard } from '@tutu-services/account'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { Bank } from '../../../../utils'

type NewCreditCardProps = {
  isOpen: boolean
  onClose: () => void
  onReturn: () => void
}

type CreditCardFormData = {
  bank: string
  nickname: string
  limit: string
}

export const NewCreditCard = ({
  isOpen,
  onClose,
  onReturn
}: NewCreditCardProps) => {
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
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={onClose}>
        <button
          type='button'
          className='cursor-pointer p-1 rounded-lg hover:bg-muted'
          onClick={onReturn}
          aria-label='Voltar para opções de adição'
        >
          <ChevronLeftIcon size={16} className='text-muted-foreground' />
        </button>
        <div>
          <Text appearance='h2' className='font-bold text-base'>
            Novo cartão de crédito
          </Text>
          <Text
            appearance='caption'
            className='text-muted-foreground text-[11px]'
          >
            Sem número ou bandeira — só o essencial
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  )
}
