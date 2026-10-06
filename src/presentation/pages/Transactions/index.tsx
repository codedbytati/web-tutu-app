import { TransactionList } from '@tutu-components/TransactionList'
import { Text, TextField } from '@tutu-ui'
import { ArrowUpDownIcon, SearchIcon } from 'lucide-react'
import { Page } from '../../layouts/Page'
import { formatCurrency } from '../utils'
import { useGetTransactionsList } from './core/useGetTransactionsList'
import { TRANSACTION_CATEGORIES } from '../utils/getTransactionCategory'
import { Details } from '@tutu-components'
import type { RemoteTransaction } from '@tutu-data'
import { useState } from 'react'

const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR')

export const Transactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<RemoteTransaction | null>(null)
  const {
    transactions,
    income,
    expenses,
    filter,
    description,
    onFilterClick,
    isError,
    isLoading,
    onSearchProps
  } = useGetTransactionsList()

  return (
    <Page>
      <Page.Header>
        <Text appearance='h3' as='h1' className='font-bold'>
          Transações
        </Text>
      </Page.Header>
      <Page.Body>
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
          icon={SearchIcon}
          label=''
          {...onSearchProps}
        />
        <div>
          <div className='flex items-center justify-between mb-4'>
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
                  onClick={() => onFilterClick(value)}
                  className={`${filter === value ?
                    'bg-primary text-white shadow-md' :
                    'bg-white text-muted-foreground cursor-pointer hover:text-accent-foreground'}
                    px-4 py-2 rounded-4xl text-xs font-semibold`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className='bg-muted rounded-xl px-2.5 py-2'>
              <p className='text-muted-foreground font-semibold text-xs'>
                {transactions.length}
              </p>
            </div>
          </div>
          {(isError) && (
            <p className='text-negative text-sm mb-3'>
              Não foi possível carregar ou salvar a transação.
            </p>
          )}
          <TransactionList>
            {isLoading && (
              <p className='p-4 text-sm text-muted-foreground'>Carregando...</p>
            )}
            {!isLoading && !isError && transactions.length === 0 && (
              <p className='p-4 text-sm text-muted-foreground'>
                Nenhuma transação encontrada.
              </p>
            )}
            {transactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((transaction) => (
                <TransactionList.Item
                  key={transaction.id}
                  transaction={transaction}
                  icon={
                    transaction.category
                      ? TRANSACTION_CATEGORIES[transaction.category]?.icon ??
                      ArrowUpDownIcon
                      : ArrowUpDownIcon
                  }
                  description={description(transaction)}
                  type={transaction.type}
                  date={formatDate(transaction.date)}
                  amount={formatCurrency(Math.abs(transaction.value))}
                  onClick={setSelectedTransaction}
                />
              ))}
          </TransactionList>
        </div>
      </Page.Body>
      <Details
        isOpen={selectedTransaction !== null}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </Page>
  )
}
