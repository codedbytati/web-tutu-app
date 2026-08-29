import { ActionButtons, Analysis, BalanceCard, UserBar } from './components'

export const Home = () => {
  return (
    <div>
      <UserBar name='Ana' />
      <div className='flex flex-col gap-6 mx-5'>
        <BalanceCard />
        <ActionButtons />
        <Analysis />
      </div>
    </div>
  )
}