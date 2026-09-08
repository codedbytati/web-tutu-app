export const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className='w-full h-2 bg-muted rounded-lg overflow-hidden'>
      <div className='h-full bg-positive' style={{ width: `${percentage}%` }} />
    </div>
  )
}