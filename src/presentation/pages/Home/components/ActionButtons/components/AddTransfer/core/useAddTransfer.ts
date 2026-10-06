import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'
import { useToast } from '@tutu-ui'

type TransferFormData = {
  description: string
  date: string
  value: string
  sourceId: string
  destinationId: string
}

type UseAddTransferProps = {
  onClose: () => void
}

export const useAddTransfer = ({ onClose }: UseAddTransferProps) => {
  const { mutateAsync, isPending } = useCreateTransaction()
  const form = useForm<TransferFormData>({
    defaultValues: {
      description: '',
      date: new Date().toISOString().slice(0, 10),
      value: '',
      sourceId: '',
      destinationId: ''
    }
  })

  const onSubmit: SubmitHandler<TransferFormData> = async (data) => {
    const parsedValue = Number(data.value.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(parsedValue) || parsedValue <= 0) return

    try {
      await mutateAsync({
        sourceId: data.sourceId,
        destinationId: data.destinationId,
        value: parsedValue,
        type: 'TRANSFER',
        description: data.description.trim(),
        date: data.date
      })
      form.reset()
      onClose()
      useToast.add({
        title: 'Sucesso!',
        description: 'A transferência foi registrada com sucesso.',
        status: 'success'
      })
    } catch {
      useToast.add({
        title: 'Tente novamente',
        description: 'Ocorreu um erro ao registrar a transferência.',
        status: 'error'
      })
    }
  }

  return {
    ...form,
    onSubmit,
    isPending,
    onDescriptionProps: {
      ...form.register('description', {
        required: 'Informe a descrição da transferência'
      }),
      errorMessage: form.formState.errors.description?.message,
      isInvalid: Boolean(form.formState.errors.description)
    },
    onDateProps: {
      ...form.register('date', { required: 'Informe a data da transferência' }),
      errorMessage: form.formState.errors.date?.message,
      isInvalid: Boolean(form.formState.errors.date)
    },
    onValueProps: {
      ...form.register('value', {
        required: 'Informe o valor da transferência'
      }),
      errorMessage: form.formState.errors.value?.message,
      isInvalid: Boolean(form.formState.errors.value)
    },
    onOriginProps: {
      ...form.register('sourceId', { required: 'Informe a conta de origem' }),
      errorMessage: form.formState.errors.sourceId?.message,
      isInvalid: Boolean(form.formState.errors.sourceId)
    },
    onDestinationProps: {
      ...form.register('destinationId', {
        required: 'Informe a conta de destino'
      }),
      errorMessage: form.formState.errors.destinationId?.message,
      isInvalid: Boolean(form.formState.errors.destinationId)
    }
  }
}
