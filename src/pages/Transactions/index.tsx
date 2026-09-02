import { TransactionList } from '@tutu-components/TransactionList'
import { Text, TextField } from '@tutu-ui'
import { HomeIcon } from 'lucide-react'

export const Transactions = () => {
  return (
    <div className='w-1/2'>
      <Text appearance='h3' as='h1' className='font-bold mb-4 mx-5'>Transações</Text>
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-2xl bg-positive/10 border border-positive/20 p-4'>
          <Text appearance='overline' className='text-positive'>Entradas</Text>
          <Text appearance='body2' className='font-bold text-lg'>R$9.500,00</Text>
        </div>
        <div className='rounded-2xl bg-negative/10 border border-negative/20 p-4'>
          <Text appearance='overline' className='text-negative'>Saídas</Text>
          <Text appearance='body2' className='font-bold text-lg'>R$582,00</Text>
        </div>
      </div>
      <TextField placeholder='Buscar transações...' label='' />
      <div className='flex items-center justify-between my-4'>
        <div className='flex items-center gap-2'>
          <div className='bg-primary px-4 py-2 rounded-4xl shadow-md'>
            <p className='text-white font-semibold font-display text-xs'>Todas</p>
          </div>
          <div className='bg-white px-4 py-2 rounded-4xl border border-border'>
            <p className='text-muted-foreground font-semibold font-display text-xs'>Receitas</p>
          </div>
          <div className='bg-white px-4 py-2 rounded-4xl border border-border'>
            <p className='text-muted-foreground font-semibold font-display text-xs'>Despesas</p>
          </div>
        </div>
        <div className='bg-muted rounded-xl px-2.5 py-2'>
          <p className='text-muted-foreground font-semibold text-xs'>12</p>
        </div>
      </div>
      <TransactionList>
        <TransactionList.Item
          icon={HomeIcon}
          description='Compra de produtos'
          type='Débito'
          date='01/01/2023'
          amount='100,00'
        />
      </TransactionList>
    </div>
  )
}