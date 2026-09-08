import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'

type ExpenseFormData = {
  description: string
  date: string
  value: string
  sourceId: string
  category: string
}

type UseAddExpenseProps = {
  onClose: () => void
}

export const useAddExpense = ({ onClose }: UseAddExpenseProps) => {
  const { mutateAsync, isPending, isError } = useCreateTransaction()
  const form = useForm<ExpenseFormData>({
    defaultValues: {
      description: '',
      date: new Date().toISOString().slice(0, 10),
      value: '',
      sourceId: '',
      category: ''
    }
  })

  const onSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
    const parsedValue = Number(data.value.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(parsedValue) || parsedValue <= 0) return

    try {
      await mutateAsync({
        sourceId: data.sourceId,
        value: parsedValue,
        type: 'DEBIT',
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
