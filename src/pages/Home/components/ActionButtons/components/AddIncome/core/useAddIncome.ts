import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'

type IncomeFormData = {
  description: string
  date: string
  value: string
  sourceId: string
  category: string
}

type UseAddIncomeProps = {
  onClose: () => void
}

export const useAddIncome = ({ onClose }: UseAddIncomeProps) => {
  const { mutateAsync, isPending, isError } = useCreateTransaction()
  const form = useForm<IncomeFormData>({
    defaultValues: {
      description: '',
      date: new Date().toISOString().slice(0, 10),
      value: '',
      sourceId: '',
      category: ''
    }
  })

  const onSubmit: SubmitHandler<IncomeFormData> = async (data) => {
    const parsedValue = Number(data.value.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(parsedValue) || parsedValue <= 0) return

    try {
      await mutateAsync({
        sourceId: data.sourceId,
        value: parsedValue,
        type: 'CREDIT',
        description: data.description.trim(),
        category: data.category,
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
