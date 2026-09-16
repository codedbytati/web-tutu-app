import { SelectItem } from '@tutu-ui/Form/Select'
import { useGetAccount } from '@tutu-services/account'

export const AccountOptions = () => {
  const { data } = useGetAccount()
  const accounts = data?.account ?? []
  const cards = data?.cards ?? []

  return (
    <>
      {accounts.map((account) => (
        <SelectItem key={`account:${account.id}`} value={`account:${account.id}`}>
          {account.nickname} ({account.bank})
        </SelectItem>
      ))}
      {cards.map((card) => (
        <SelectItem key={`card:${card.id}`} value={`card:${card.id}`}>
          {card.nickname} ({card.bank})
        </SelectItem>
      ))}
    </>
  )
}