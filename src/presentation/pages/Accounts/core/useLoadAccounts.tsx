import { useDeactivateAccount, useDeactivateCreditCard, useGetAccount } from '@tutu-services/account'
import { useState } from 'react'

export const useLoadAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useGetAccount()
  const { mutate: deactivateAccount } = useDeactivateAccount()
  const { mutate: deactivateCreditCard } = useDeactivateCreditCard()
  const accounts = data?.account ?? []
  const cards = data?.cards ?? []

  return {
    accounts,
    cards,
    deactivateAccount,
    deactivateCreditCard,
    onOpenAddAccount: () => setIsModalOpen(true),
    addAccount: {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  }
}
