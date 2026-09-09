import { useState, type SubmitEvent } from 'react'
import { ChevronLeftIcon, TagIcon } from 'lucide-react'
import { Button, CurrencyField, Modal, Select, Text, TextField } from '@tutu-ui'
import { useCreateAccount } from '@tutu-services/account'
import { SelectItem } from '@tutu-ui/Form/Select'
import { bankOptions, type Bank } from '../../../../utils'

type NewAccountProps = {
  isOpen: boolean
  onClose: () => void
  onReturn: () => void
}

type AccountType = 'CURRENT' | 'SAVINGS' | 'INVESTMENT'

export const NewAccount = ({ isOpen, onClose, onReturn }: NewAccountProps) => {
  const createAccount = useCreateAccount()
  const [bank, setBank] = useState<Bank | ''>('')
  const [nickname, setNickname] = useState('')
  const [type, setType] = useState<AccountType | ''>('')
  const [balance, setBalance] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedBalance = Number(balance.replace(/\./g, '').replace(',', '.'))
    if (
      !bank ||
      !nickname.trim() ||
      !type ||
      !Number.isFinite(parsedBalance)
    )
      return

    createAccount.mutate(
      { bank, nickname, type, balance: parsedBalance },
      {
        onSuccess: () => {
          setBank('')
          setNickname('')
          setType('')
          setBalance('')
          onClose()
        }
      }
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={onClose}>
        <button className='cursor-pointer p-1 rounded-lg hover:bg-muted' onClick={onReturn}>
          <ChevronLeftIcon size={16} className='text-muted-foreground' />
        </button>
        <div>
          <Text appearance='h2' className='font-bold text-base'>
            Nova conta
          </Text>
          <Text
            appearance='caption'
            className='text-muted-foreground text-[11px]'
          >
            Cadastre os dados essenciais da sua conta
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Select
            label='Banco ou instituição'
            value={bank}
            onChange={(event) => setBank(event.target.value as Bank)}
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
          <Select
            label='Tipo da conta'
            value={type}
            onChange={(event) =>
              setType(event.target.value as AccountType)
            }
            required
          >
            <SelectItem value=''>Selecione um tipo</SelectItem>
            <SelectItem value='CURRENT'>Corrente</SelectItem>
            <SelectItem value='SAVINGS'>Poupança</SelectItem>
            <SelectItem value='INVESTMENT'>Investimento</SelectItem>
          </Select>
          <CurrencyField
            label='Saldo inicial'
            value={balance}
            onChange={(value) => setBalance(value)}
            inputMode='decimal'
            required
          />
          {createAccount.isError && (
            <Text appearance='caption' className='text-negative'>
              Não foi possível adicionar a conta
            </Text>
          )}
          <Button variant='positive' size='md' type='submit' disabled={createAccount.isPending}>
            Adicionar conta
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
