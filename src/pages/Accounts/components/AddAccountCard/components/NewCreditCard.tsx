import { useState, type SubmitEvent } from 'react'
import { ChevronLeftIcon, TagIcon } from 'lucide-react'
import { Button, CurrencyField, Modal, Select, SelectItem, Text, TextField } from '@tutu-ui'
import { useCreateCreditCard } from '@tutu-services/account'
import { bankOptions, type Bank } from '../../../../utils'

type NewCreditCardProps = {
  isOpen: boolean
  onClose: () => void
  onReturn: () => void
}

export const NewCreditCard = ({
  isOpen,
  onClose,
  onReturn
}: NewCreditCardProps) => {
  const createCard = useCreateCreditCard()
  const [bank, setBank] = useState<Bank | ''>('')
  const [nickname, setNickname] = useState('')
  const [limit, setLimit] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedLimit = Number(limit.replace(',', '.'))
    if (
      !bank ||
      !nickname.trim() ||
      !Number.isFinite(parsedLimit) ||
      parsedLimit < 0
    )
      return

    createCard.mutate(
      { bank, nickname, limit: parsedLimit },
      {
        onSuccess: () => {
          setBank('')
          setNickname('')
          setLimit('')
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={onClose}>
        <button
          type='button'
          className='cursor-pointer p-1 rounded-lg hover:bg-muted'
          onClick={onReturn}
          aria-label='Voltar para opções de adição'
        >
          <ChevronLeftIcon size={16} className='text-muted-foreground' />
        </button>
        <div>
          <Text appearance='h2' className='font-bold text-base'>
            Novo cartão de crédito
          </Text>
          <Text
            appearance='caption'
            className='text-muted-foreground text-[11px]'
          >
            Sem número ou bandeira — só o essencial
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Select
            label='Banco'
            value={bank}
            onChange={(event) => setBank(event.target.value as Bank | '')}
            required
          >
            <SelectItem value=''>Selecione um banco</SelectItem>
            {bankOptions.map(([value, pattern]) => (
              <SelectItem key={value} value={value}>
                {pattern.name}
              </SelectItem>
            ))}
          </Select>
          <TextField
            label='Apelido'
            icon={TagIcon}
            placeholder='Ex: Principal, Viagens...'
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            required
          />
          <CurrencyField
            label='Limite total'
            value={limit}
            onChange={(value) => setLimit(value)}
            inputMode='decimal'
            required
          />
          {createCard.isError && (
            <Text appearance='caption' className='text-negative'>
              Não foi possível adicionar o cartão
            </Text>
          )}
          <Button size='md' type='submit' disabled={createCard.isPending}>
            Adicionar cartão
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
