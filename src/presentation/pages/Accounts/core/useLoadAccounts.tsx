import {
  useDeactivateAccount,
  useDeactivateCreditCard,
  useGetAccount
} from '@tutu-services/account'
import { useToast } from '@tutu-ui'
import { useState } from 'react'

export const useLoadAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useGetAccount()
  const { mutateAsync: deactivateAccount } = useDeactivateAccount()
  const { mutateAsync: deactivateCreditCard } = useDeactivateCreditCard()
  const accounts = data?.account ?? []
  const cards = data?.cards ?? []

  return {
    accounts,
    cards,
    deactivateAccount: async (id: string) => {
      try {
        await deactivateAccount(id)
        useToast.add({
          title: 'Sucesso!',
          description: 'O status da conta foi atualizado.',
          status: 'success'
        })
      } catch {
        useToast.add({
          title: 'Tente novamente',
          description: 'Não foi possível atualizar a conta.',
          status: 'error'
        })
      }
    },
    deactivateCreditCard: async (id: string) => {
      try {
        await deactivateCreditCard(id)
        useToast.add({
          title: 'Sucesso!',
          description: 'O status do cartão foi atualizado.',
          status: 'success'
        })
      } catch {
        useToast.add({
          title: 'Tente novamente',
          description: 'Não foi possível atualizar o cartão.',
          status: 'error'
        })
      }
    },
    onOpenAddAccount: () => setIsModalOpen(true),
    addAccount: {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  }
}
