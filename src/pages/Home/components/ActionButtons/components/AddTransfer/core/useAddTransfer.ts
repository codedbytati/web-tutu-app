import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'

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
  const { mutateAsync, isPending, isError } = useCreateTransaction()
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
    } catch {
      // Keep the form values so the user can retry.
    }
  }

  return {
    ...form,
    onSubmit,
    isPending,
    isError
  }
}
