import { Button, CurrencyField, Modal, Text, TextField } from '@tutu-ui'
import { useCreateCard } from '@tutu-hooks'
import { ChevronLeftIcon, LandmarkIcon, TagIcon } from 'lucide-react'
import { useState } from 'react'

type NewCreditCardProps = {
  isOpen: boolean
  onClose: () => void
}

export const NewCreditCard = ({ isOpen, onClose }: NewCreditCardProps) => {
  const createCard = useCreateCard()
  const [bank, setBank] = useState('')
  const [nickname, setNickname] = useState('')
  const [limit, setLimit] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedLimit = Number(limit.replace(',', '.'))
    if (!bank.trim() || !nickname.trim() || !Number.isFinite(parsedLimit) || parsedLimit < 0) return

    createCard.mutate({ bank, nickname, limit: parsedLimit }, {
      onSuccess: () => {
        setBank('')
        setNickname('')
        setLimit('')
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <ChevronLeftIcon />
        <div>
          <Text appearance='h2' className='font-bold text-base'>Novo cartão de crédito</Text>
          <Text appearance='caption' className='text-muted-foreground text-[11px]'>Sem número ou bandeira — só o essencial</Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField label="Banco" icon={LandmarkIcon} placeholder='Ex: Banco do Brasil, Santander...' value={bank} onChange={(event) => setBank(event.target.value)} required />
          <TextField label="Apelido" icon={TagIcon} placeholder='Ex: Principal, Viagens...' value={nickname} onChange={(event) => setNickname(event.target.value)} required />
          <CurrencyField label="Limite total" value={limit} onChange={(event) => setLimit(event.target.value)} inputMode='decimal' required />
          {createCard.isError && <Text appearance='caption' className='text-negative'>Não foi possível adicionar o cartão.</Text>}
          <Button type='submit' disabled={createCard.isPending}>Adicionar cartão</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}