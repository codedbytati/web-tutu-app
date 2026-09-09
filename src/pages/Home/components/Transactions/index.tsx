import { TransactionList } from '@tutu-components'
import { useGetNewestTransactions } from './core/useGetNewestTransactions'
import { TRANSACTION_CATEGORIES } from '../../../utils/getTransactionCategory'
import { ArrowUpDownIcon } from 'lucide-react'
import { formatCurrency } from '../../../utils'

export const Transactions = () => {
  const { transactions, description, isError, isLoading } = useGetNewestTransactions()
  const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR')

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='font-display font-bold text-sm text-foreground'>
          Últimas transações
        </h2>
        <a
          href='/transacoes'
          className='font-semibold text-xs text-primary'
        >
          Ver todos
        </a>
      </div>
      <TransactionList>
        {transactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((transaction) => (
            <TransactionList.Item
              key={transaction.id}
              icon={transaction.category
                ? TRANSACTION_CATEGORIES[transaction.category]?.icon ??
                ArrowUpDownIcon
                : ArrowUpDownIcon}
              description={description(transaction)}
              type={transaction.type}
              date={formatDate(transaction.date)}
              amount={formatCurrency(transaction.value)}
            />
          ))}
        {isLoading && (
          <p className='p-4 text-sm text-muted-foreground'>Carregando...</p>
        )}
        {isError && (
          <p className='p-4 text-sm text-negative'>
            Não foi possível carregar as transações.
          </p>
        )}
        {!isLoading && !isError && transactions.length === 0 && (
          <p className='p-4 text-sm text-muted-foreground'>
            Nenhuma transação encontrada.
          </p>
        )}
      </TransactionList>
    </div>
  )
}