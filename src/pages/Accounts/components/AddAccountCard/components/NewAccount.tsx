import { Button, CurrencyField, Modal, Select, Text, TextField } from '@tutu-ui'
import { SelectItem } from '@tutu-ui/Form/Select'
import { ChevronLeftIcon, LandmarkIcon, TagIcon } from 'lucide-react'
import { useState } from 'react'
import { useCreateAccount } from '@tutu-hooks'

type NewAccountProps = {
  isOpen: boolean
  onClose: () => void
}

export const NewAccount = ({ isOpen, onClose }: NewAccountProps) => {
  const createAccount = useCreateAccount()
  const [bank, setBank] = useState('')
  const [nickname, setNickname] = useState('')
  const [type, setType] = useState('')
  const [balance, setBalance] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedBalance = Number(balance.replace(',', '.'))
    if (!bank.trim() || !nickname.trim() || !type || !Number.isFinite(parsedBalance)) return

    createAccount.mutate({ bank, nickname, type, balance: parsedBalance }, {
      onSuccess: () => {
        setBank('')
        setNickname('')
        setType('')
        setBalance('')
        onClose()
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <ChevronLeftIcon />
        <div>
          <Text appearance='h2' className='font-bold text-base'>Nova conta bancária</Text>
          <Text appearance='caption' className='text-muted-foreground text-[11px]'>Cadastre os dados essenciais da sua conta</Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Banco"
            icon={LandmarkIcon}
            placeholder='Ex: Banco do Brasil, Santander...'
            value={bank}
            onChange={(event) => setBank(event.target.value)}
            required
          />
          <TextField
            label="Apelido"
            icon={TagIcon}
            placeholder='Ex: Principal, Viagens...'
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            required
          />
          <Select label='Tipo da conta' value={type} onChange={(event) => setType(event.target.value)} required>
            <SelectItem value=''>Selecione um tipo</SelectItem>
            <SelectItem value='Corrente'>Corrente</SelectItem>
            <SelectItem value='Poupança'>Poupança</SelectItem>
            <SelectItem value='Investimento'>Investimento</SelectItem>
          </Select>
          <CurrencyField
            label="Saldo inicial"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            inputMode='decimal'
            required
          />

          {createAccount.isError && <Text appearance='caption' className='text-negative'>Não foi possível adicionar a conta.</Text>}
          <Button type='submit' disabled={createAccount.isPending}>Adicionar conta</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}