import { MinusCircleIcon } from 'lucide-react'
import { Modal, Text } from '@tutu-ui'
import { AddExpenseForm } from '@tutu-components'
import { useAddExpense } from './core/useAddExpense'

type AddNewExpenseProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const AddExpense = ({
  isModalOpen,
  setIsModalOpen
}: AddNewExpenseProps) => {
  const {
    onSubmit,
    onDescriptionProps,
    onDateProps,
    onValueProps,
    onCategoryProps,
    onSourceIdProps,
    isPending
  } = useAddExpense({ onClose: () => setIsModalOpen(false) })

  return (
    <Modal isOpen={isModalOpen}>
      <Modal.Header onClose={() => setIsModalOpen(false)}>
        <div className='bg-negative/10 rounded-2xl p-2'>
          <MinusCircleIcon size={20} className='text-negative' />
        </div>
        <div>
          <Text appearance='h2' className='text-base font-bold font-display'>
            Nova despesa
          </Text>
          <Text appearance='caption' className='text-muted-foreground'>
            Registre um valor gasto
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <AddExpenseForm
          onSubmit={onSubmit}
          onDescriptionProps={onDescriptionProps}
          onDateProps={onDateProps}
          onValueProps={onValueProps}
          onCategoryProps={onCategoryProps}
          onSourceIdProps={onSourceIdProps}
          isPending={isPending}
        />
      </Modal.Body>
    </Modal >
  )
}
