type ColoredCardProps = {
  children: React.ReactNode
}

export const ColoredCard = ({ children }: ColoredCardProps) => {
  return (
    <div className='relative overflow-hidden w-full p-6 rounded-3xl bg-linear-to-br from-primary to-primary-dark'>
      <div className='absolute size-40 -top-20 -right-20 bottom-40 bg-card opacity-10 rounded-full'></div>
      <div className='flex flex-col items-start gap-2'>{children}</div>
    </div>
  )
}
