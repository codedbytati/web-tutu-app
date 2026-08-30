import { ActionButtons, Analysis, BalanceCard, BalanceChart, Transactions, UserBar } from './components'

export const Home = () => {
  return (
    <div>
      <UserBar name='Ana' />
      <div className='flex flex-col gap-6 mx-5 mb-6'>
        <BalanceCard />
        <ActionButtons />
        <Analysis />
        <BalanceChart />
        <Transactions />
      </div>
    </div>
  )
}