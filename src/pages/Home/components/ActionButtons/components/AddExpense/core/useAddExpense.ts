import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'
import { useToast } from '@tutu-ui'

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
  const { mutateAsync, isPending } = useCreateTransaction()
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
      useToast.add({
        title: 'Sucesso!',
        description: 'A despesa foi registrada com sucesso.',
        status: 'success'
      })
    } catch {
      useToast.add({
        title: 'Tente novamente',
        description: 'Ocorreu um erro ao registrar a despesa.',
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
        required: 'Informe a descrição da despesa.'
      }),
      isInvalid: Boolean(form.formState.errors.description),
      errorMessage: form.formState.errors.description?.message
    },
    onDateProps: {
      ...form.register('date', {
        required: 'Informe a data da despesa.'
      }),
      isInvalid: Boolean(form.formState.errors.date),
      errorMessage: form.formState.errors.date?.message
    },
    onValueProps: {
      ...form.register('value', {
        required: 'Informe o valor da despesa.'
      }),
      isInvalid: Boolean(form.formState.errors.value),
      errorMessage: form.formState.errors.value?.message
    },
    onCategoryProps: {
      ...form.register('category', {
        required: 'Informe a categoria da despesa.'
      }),
      isInvalid: Boolean(form.formState.errors.category),
      errorMessage: form.formState.errors.category?.message
    },
    onSourceIdProps: {
      ...form.register('sourceId', {
        required: 'Informe a conta da despesa.'
      }),
      isInvalid: Boolean(form.formState.errors.sourceId),
      errorMessage: form.formState.errors.sourceId?.message
    }
  }
}
