export const BalanceCard = () => {
  return (
    <div className='relative overflow-hidden p-6 rounded-3xl bg-linear-to-br from-primary to-violet-dark'>
      <div className='absolute size-40 -top-20 -right-20 bottom-40 bg-card opacity-10 rounded-full'></div>
      <div className='flex flex-col items-start gap-2'>
        <p className='text-card/65 uppercase font-semibold font-display text-xs'>Saldo total</p>
        <p className='font-display font-bold text-3xl text-card'>R$ 1.000,00</p>
      </div>
    </div>
  )
}