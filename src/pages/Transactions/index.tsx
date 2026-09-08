import { TransactionList } from '@tutu-components/TransactionList'
import { Button, Text, TextField } from '@tutu-ui'
import {
  ArrowLeftRightIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import type { Transaction, TransactionType } from '../../services/api'

type Filter = 'all' | 'income' | 'expense'

const formatCurrency = (value: number) =>
  Math.abs(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR')

const transactionDescription = (transaction: Transaction) => {
  if (transaction.description) return transaction.description
  if (transaction.type === 'Transfer')
    return `${transaction.from || 'Origem'} para ${transaction.to || 'Destino'}`
  return transaction.type === 'Credit'
    ? transaction.from || transaction.to || 'Entrada'
    : transaction.to || transaction.from || 'Saída'
}

export const Transactions = () => {
  const { data, isLoading, isError } = useAccount()
  const createTransactionMutation = useCreateTransaction()
  const transactions: Transaction[] = data?.transactions || []
  const accountId = data?.account[0]?.id || ''
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [kind, setKind] = useState<'expense' | 'income' | 'transfer'>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [destination, setDestination] = useState('')
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesFilter =
          filter === 'all' ||
          (filter === 'income'
            ? transaction.type === 'Credit'
            : transaction.type === 'Debit')
        return (
          matchesFilter &&
          transactionDescription(transaction)
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      }),
    [filter, search, transactions]
  )

  const income = transactions
    .filter(({ type }) => type === 'Credit')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0)
  const expenses = transactions
    .filter(({ type }) => type === 'Debit')
    .reduce((sum, transaction) => sum + Math.abs(transaction.value), 0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !accountId ||
      !amount ||
      !description ||
      (kind === 'transfer' && !destination)
    )
      return

    try {
      const type: TransactionType =
        kind === 'income'
          ? 'Credit'
          : kind === 'transfer'
            ? 'Transfer'
            : 'Debit'
      await createTransactionMutation.mutateAsync({
        accountId,
        value: Number(amount.replace(',', '.')),
        type,
        from:
          kind === 'income'
            ? description
            : kind === 'transfer'
              ? description
              : undefined,
        to:
          kind === 'income'
            ? undefined
            : kind === 'transfer'
              ? destination
              : description
      })
      setAmount('')
      setDescription('')
      setDestination('')
      setIsFormOpen(false)
    } catch (error) {
      void error
    }
  }

  return (
    <div className='w-full max-w-3xl px-5 pb-8'>
      <div className='flex items-center justify-between mb-4'>
        <Text appearance='h3' as='h1' className='font-bold'>
          Transações
        </Text>
        <Button size='sm' onClick={() => setIsFormOpen((open) => !open)}>
          <PlusIcon size={16} /> Nova transação
        </Button>
      </div>
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className='bg-card border border-border rounded-2xl p-4 mb-5 grid gap-3'
        >
          <div className='grid grid-cols-3 gap-2'>
            {(['expense', 'income', 'transfer'] as const).map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => setKind(option)}
                className={`rounded-xl border py-2 text-xs font-semibold ${kind === option ? 'bg-primary text-white border-primary' : 'bg-background border-border'}`}
              >
                {option === 'expense'
                  ? 'Despesa'
                  : option === 'income'
                    ? 'Receita'
                    : 'Transferência'}
              </button>
            ))}
          </div>
          <TextField
            label='Valor'
            placeholder='0,00'
            type='number'
            min='0.01'
            step='0.01'
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <TextField
            label={kind === 'income' ? 'Origem' : 'Descrição'}
            placeholder='Ex.: Salário ou mercado'
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {kind === 'transfer' && (
            <TextField
              label='Destino'
              placeholder='Conta destino'
              required
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          )}
          <Button
            type='submit'
            variant='positive'
            disabled={createTransactionMutation.isPending}
          >
            {createTransactionMutation.isPending
              ? 'Salvando...'
              : 'Salvar transação'}
          </Button>
        </form>
      )}
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-2xl bg-positive/10 border border-positive/20 p-4'>
          <Text appearance='overline' className='text-positive'>
            Entradas
          </Text>
          <Text appearance='body2' className='font-bold text-lg'>
            {formatCurrency(income)}
          </Text>
        </div>
        <div className='rounded-2xl bg-negative/10 border border-negative/20 p-4'>
          <Text appearance='overline' className='text-negative'>
            Saídas
          </Text>
          <Text appearance='body2' className='font-bold text-lg'>
            {formatCurrency(expenses)}
          </Text>
        </div>
      </div>
      <TextField
        placeholder='Buscar transações...'
        label=''
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className='flex items-center justify-between my-4'>
        <div className='flex items-center gap-2'>
          {(
            [
              ['all', 'Todas'],
              ['income', 'Receitas'],
              ['expense', 'Despesas']
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type='button'
              onClick={() => setFilter(value)}
              className={`${filter === value ? 'bg-primary text-white shadow-md' : 'bg-white text-muted-foreground border-border'} px-4 py-2 rounded-4xl border text-xs font-semibold`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className='bg-muted rounded-xl px-2.5 py-2'>
          <p className='text-muted-foreground font-semibold text-xs'>
            {filteredTransactions.length}
          </p>
        </div>
      </div>
      {(isError || createTransactionMutation.isError) && (
        <p className='text-negative text-sm mb-3'>
          Não foi possível carregar ou salvar a transação.
        </p>
      )}
      <TransactionList>
        {isLoading && (
          <p className='p-4 text-sm text-muted-foreground'>Carregando...</p>
        )}
        {!isLoading && !isError && filteredTransactions.length === 0 && (
          <p className='p-4 text-sm text-muted-foreground'>
            Nenhuma transação encontrada.
          </p>
        )}
        {filteredTransactions.map((transaction) => (
          <TransactionList.Item
            key={transaction.id}
            icon={
              transaction.type === 'Transfer'
                ? ArrowLeftRightIcon
                : transaction.type === 'Credit'
                  ? TrendingUpIcon
                  : TrendingDownIcon
            }
            description={transactionDescription(transaction)}
            type={
              transaction.type === 'Credit'
                ? 'Receita'
                : transaction.type === 'Transfer'
                  ? 'Transferência'
                  : 'Despesa'
            }
            date={formatDate(transaction.date)}
            amount={formatCurrency(transaction.value)}
            isPositive={transaction.type === 'Credit'}
          />
        ))}
      </TransactionList>
    </div>
  )
}
