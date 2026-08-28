export const BalanceCard = () => {
  return (
    <div className='relative overflow-hidden p-6 rounded-3xl bg-linear-to-br from-tutu-violet via-indigo-500 via 7% to-tutu-violet-dark'>
      <div className='absolute size-40 -top-20 -right-20 bottom-40 bg-tutu-card opacity-10 rounded-full'></div>
      <div className='flex flex-col items-start gap-2'>
        <p className='text-tutu-card/65 uppercase font-semibold font-display text-xs'>Saldo total</p>
        <p className='font-display font-bold text-3xl text-tutu-card'>R$ 1.000,00</p>
      </div>
    </div>
  )
}