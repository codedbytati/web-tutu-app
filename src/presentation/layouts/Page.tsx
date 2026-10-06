export const Page = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-1/2'>{children}</div>
}

Page.Header = function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-between mb-4 mx-5'>
      {children}
    </div>
  )
}

Page.Body = function PageBody({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-6 mx-5 mb-6'>{children}</div>
}
