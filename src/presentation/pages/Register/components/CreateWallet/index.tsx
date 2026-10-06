import { useState } from 'react'
import { ChevronRightIcon, CreditCardIcon, LandmarkIcon } from 'lucide-react'
import { Text } from '@tutu-ui'
import { useAuth } from '@tutu-contexts/authContext'
import { AddAccount } from './AddAccount'
import { AddCreditCard } from './AddCreditCard'
import Logo from '../../../../../assets/logo.png'

export const CreateWallet = () => {
  const { loggedUser } = useAuth()
  const [selectedWallet, setSelectedWallet] = useState<'account' | 'credit' | null>(null)
  const closeWallet = () => setSelectedWallet(null)

  return (
    <div className='w-1/3 bg-background flex min-h-screen m-auto flex-col items-center justify-center'>
      {selectedWallet === null && (
        <>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <img
                src={Logo}
                alt='Quadrado com bordas arredondadas com fundo violeta e a letra T maiúscula em branco'
              />
              <h1 className='font-display font-black text-foreground'>tutu</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <Text appearance='h2' className='font-extrabold'>Olá, {loggedUser?.displayName}!</Text>
              <Text appearance='body1' className='text-muted-foreground'>Vamos configurar sua conta tutu. Por onde você quer começar?</Text>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3 mt-6'>
            <div className='flex flex-col items-start gap-3 bg-card border-2 border-border p-5 rounded-2xl hover:border-positive hover:bg-surface'>
              <div className='bg-positive/10 rounded-2xl p-3'>
                <LandmarkIcon size={24} className='text-positive' />
              </div>
              <div>
                <Text appearance='body1' className='font-display font-bold'>Conta bancária</Text>
                <Text appearance='body2' className='text-muted-foreground'>Acompanhe seu saldo e movimentações.</Text>
              </div>
              <button className='bg-positive/10 rounded-xl p-2 cursor-pointer' onClick={() => setSelectedWallet('account')}>
                <ChevronRightIcon size={14} className='text-positive' />
              </button>
            </div>
            <div className='flex flex-col items-start gap-3 bg-card border-2 border-border p-5 rounded-2xl hover:border-primary hover:bg-surface'>
              <div className='bg-primary/10 rounded-2xl p-3'>
                <CreditCardIcon size={24} className='text-primary' />
              </div>
              <div>
                <Text appearance='body1' className='font-display font-bold'>Cartão de crédito</Text>
                <Text appearance='body2' className='text-muted-foreground'>Controle limites e gastos no cartão.</Text>
              </div>
              <button className='bg-primary/10 rounded-xl p-2 cursor-pointer' onClick={() => setSelectedWallet('credit')}>
                <ChevronRightIcon size={14} className='text-primary' />
              </button>
            </div>
          </div>
        </>)}
      {selectedWallet === 'account' && <AddAccount onClose={closeWallet} />}
      {selectedWallet === 'credit' && <AddCreditCard onClose={closeWallet} />}
    </div>
  )
}