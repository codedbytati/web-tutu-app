export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-6 mx-5 mb-6'>
      {children}
    </div>
  )
}