import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ArrowUpDownIcon } from 'lucide-react'
import { Button, Modal, Text, useToast } from '@tutu-ui'
import { AddExpenseForm, AddIncomeForm, AddTransferForm } from '@tutu-components'
import type { RemoteTransaction } from '@tutu-data'
import { useDeleteTransaction, useUpdateTransaction } from '@tutu-services/account'
import { TRANSACTION_CATEGORIES } from '../../../pages/utils/getTransactionCategory'

type DetailsProps = {
  isOpen: boolean
  onClose: () => void
  transaction: RemoteTransaction | null
}

type TransactionFormData = {
  description: string
  date: string
  value: string
  category: string
  sourceId: string
  from: string
  to: string
}

const formatDateInput = (date: string) => new Date(date).toISOString().slice(0, 10)
const formatCurrencyInput = (value: number) => Math.abs(value).toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const Details = ({ isOpen, onClose, transaction }: DetailsProps) => {
  const updateTransaction = useUpdateTransaction()
  const deleteTransaction = useDeleteTransaction()
  const form = useForm<TransactionFormData>()

  useEffect(() => {
    if (!transaction) return

    form.reset({
      description: transaction.description || '',
      date: formatDateInput(transaction.date),
      value: formatCurrencyInput(transaction.value),
      category: transaction.category || '',
      sourceId: transaction.accountId ? `account:${transaction.accountId}` : '',
      from: transaction.from || '',
      to: transaction.to || ''
    })
  }, [form, transaction])

  if (!transaction) return null

  const Icon = transaction.category
    ? TRANSACTION_CATEGORIES[transaction.category]?.icon ??
    ArrowUpDownIcon
    : ArrowUpDownIcon

  const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    const value = Number(data.value.replace(/\./g, '').replace(',', '.'))
    if (!Number.isFinite(value) || value <= 0) return

    try {
      await updateTransaction.mutateAsync({
        id: transaction.id,
        value,
        type: transaction.type,
        description: data.description.trim(),
        date: data.date,
        category: data.category || undefined,
        from: data.from.trim() || undefined,
        to: data.to.trim() || undefined
      })
      useToast.add({ title: 'Sucesso!', description: 'Transação atualizada com sucesso.', status: 'success' })
      onClose()
    } catch {
      useToast.add({ title: 'Tente novamente', description: 'Não foi possível atualizar a transação.', status: 'error' })
    }
  }

  const onDelete = async () => {
    try {
      await deleteTransaction.mutateAsync(transaction.id)
      useToast.add({ title: 'Sucesso!', description: 'Transação excluída com sucesso.', status: 'success' })
      onClose()
    } catch {
      useToast.add({ title: 'Tente novamente', description: 'Não foi possível excluir a transação.', status: 'error' })
    }
  }

  const commonProps = {
    onDescriptionProps: {
      ...form.register('description', { required: 'Informe a descrição.' }),
      isInvalid: Boolean(form.formState.errors.description),
      errorMessage: form.formState.errors.description?.message
    },
    onDateProps: {
      ...form.register('date', { required: 'Informe a data.' }),
      isInvalid: Boolean(form.formState.errors.date),
      errorMessage: form.formState.errors.date?.message
    },
    onValueProps: {
      ...form.register('value', { required: 'Informe o valor.' }),
      isInvalid: Boolean(form.formState.errors.value),
      errorMessage: form.formState.errors.value?.message
    },
    isPending: updateTransaction.isPending
  }

  return (
    <Modal isOpen={isOpen && Boolean(transaction)}>
      <Modal.Header onClose={onClose}>
        <div className='bg-primary/10 rounded-2xl p-2'>
          <Icon size={20} className='text-primary' />
        </div>
        <div>
          <Text appearance='h2' className='text-base font-bold font-display'>{transaction.description}</Text>
          <Text appearance='caption' className='text-muted-foreground'>
            {transaction.category ? TRANSACTION_CATEGORIES[transaction.category]?.name : undefined}
            ·
            {transaction.date}
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body key={`${transaction.id}-${transaction.type}`}>
        {transaction.type === 'DEBIT' && (
          <AddExpenseForm
            onSubmit={form.handleSubmit(onSubmit)}
            {...commonProps}
            onCategoryProps={{ ...form.register('category') }}
            onSourceIdProps={{ ...form.register('sourceId') }}
          />
        )}
        {transaction.type === 'CREDIT' && (
          <AddIncomeForm
            onSubmit={form.handleSubmit(onSubmit)}
            {...commonProps}
            onCategoryProps={{ ...form.register('category') }}
            onSourceIdProps={{ ...form.register('sourceId') }}
          />
        )}
        {transaction.type === 'TRANSFER' && (
          <AddTransferForm
            onSubmit={form.handleSubmit(onSubmit)}
            {...commonProps}
            onFromProps={{ ...form.register('from') }}
            onToProps={{ ...form.register('to') }}
          />
        )}
        <Button
          type='button'
          variant='danger'
          disabled={deleteTransaction.isPending || updateTransaction.isPending}
          onClick={onDelete}
        >
          {deleteTransaction.isPending ? 'Excluindo...' : 'Excluir transação'}
        </Button>
      </Modal.Body>
    </Modal>
  )
}