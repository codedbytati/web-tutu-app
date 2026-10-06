import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTransaction } from '@tutu-services/account'
import { useToast } from '@tutu-ui'

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
  const { mutateAsync, isPending } = useCreateTransaction()
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
      useToast.add({
        title: 'Sucesso!',
        description: 'A receita foi registrada com sucesso.',
        status: 'success'
      })
    } catch {
      useToast.add({
        title: 'Tente novamente',
        description: 'Ocorreu um erro ao registrar a receita.',
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
        required: 'Informe a descrição da receita.'
      }),
      isInvalid: Boolean(form.formState.errors.description),
      errorMessage: form.formState.errors.description?.message
    },
    onDateProps: {
      ...form.register('date', { required: 'Informe a data da receita.' }),
      isInvalid: Boolean(form.formState.errors.date),
      errorMessage: form.formState.errors.date?.message
    },
    onValueProps: {
      ...form.register('value', { required: 'Informe o valor da receita.' }),
      isInvalid: Boolean(form.formState.errors.value),
      errorMessage: form.formState.errors.value?.message
    },
    onCategoryProps: {
      ...form.register('category', { required: 'Selecione uma categoria.' }),
      isInvalid: Boolean(form.formState.errors.category),
      errorMessage: form.formState.errors.category?.message
    },
    onSourceIdProps: {
      ...form.register('sourceId', { required: 'Selecione uma conta.' }),
      isInvalid: Boolean(form.formState.errors.sourceId),
      errorMessage: form.formState.errors.sourceId?.message
    }
  }
}
