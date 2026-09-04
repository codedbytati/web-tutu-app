import { useAuth } from '@tutu-contexts/authContext'
import { ColoredCard } from '@tutu-components'
import {
  ActionButtons,
  Analysis,
  BalanceChart,
  UserBar
} from './components'
import { HomeIcon } from 'lucide-react'
import { TransactionList } from '@tutu-components/TransactionList'
import { Page } from '../../layouts/Page'
import { useAccount } from '@tutu-hooks'
import type { Transaction } from '../../services/api'

const formatCurrency = (value: number) => Math.abs(value).toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR')

const getDescription = (transaction: Transaction) => {
  if (transaction.type === 'Transfer') return `${transaction.from || 'Origem'} para ${transaction.to || 'Destino'}`
  return transaction.type === 'Credit'
    ? transaction.from || transaction.to || 'Entrada'
    : transaction.to || transaction.from || 'Saída'
}

export const Home = () => {
  const { loggedUser } = useAuth()
  const { data, isLoading, isError } = useAccount()
  const transactions: Transaction[] = data?.transactions || []

  const balance = transactions.reduce((total, transaction) => total + transaction.value, 0)

  return (
    <div className='w-1/2'>
      <UserBar name={loggedUser?.displayName ?? 'Boas vindas'} />
      <Page>
        <ColoredCard>
          <p className='text-card/65 uppercase font-semibold font-display text-xs'>Saldo total</p>
          <p className='font-display font-bold text-3xl text-card'>{formatCurrency(balance)}</p>
        </ColoredCard>
        <ActionButtons />
        <Analysis />
        <BalanceChart />
        <div>
          <div className='flex items-center justify-between'>
            <h2 className='font-display font-bold text-sm text-foreground'>Últimas transações</h2>
            <a href='/transferencias' className='font-semibold text-xs text-primary'>Ver todos</a>
          </div>
          <TransactionList>
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionList.Item
                key={transaction.id}
                icon={HomeIcon}
                description={getDescription(transaction)}
                type={transaction.type === 'Credit' ? 'Receita' : transaction.type === 'Transfer' ? 'Transferência' : 'Despesa'}
                date={formatDate(transaction.date)}
                amount={formatCurrency(transaction.value)}
                isPositive={transaction.type === 'Credit'}
              />
            ))}
            {isLoading && <p className='p-4 text-sm text-muted-foreground'>Carregando...</p>}
            {isError && <p className='p-4 text-sm text-negative'>Não foi possível carregar as transações.</p>}
            {!isLoading && !isError && transactions.length === 0 && (
              <p className='p-4 text-sm text-muted-foreground'>Nenhuma transação encontrada.</p>
            )}
          </TransactionList>
        </div>
      </Page>
    </div>
  )
}