import { tv } from 'tailwind-variants'

const makeStyles = tv({
  base: ['inline-flex items-center justify-center w-fit gap-1.5 px-2 py-0.5 rounded-lg',
    '[&_span]:text-[10px] [&_span]:font-semibold [&_div]:size-1.5 [&_div]:rounded-full'],
  variants: {
    color: {
      blue: 'bg-info/15 [&_span]:text-info [&_div]:bg-info',
      green: 'bg-positive/15 [&_span]:text-positive [&_div]:bg-positive',
      red: 'bg-negative/15 [&_span]:text-negative [&_div]:bg-negative',
      yellow: 'bg-warning/15 [&_span]:text-warning [&_div]:bg-warning',
      gray: 'bg-muted-foreground/15 [&_span]:text-muted-foreground [&_div]:bg-muted-foreground'
    }
  }
})

type BadgeProps = {
  label: string
  color: 'blue' | 'green' | 'red' | 'yellow' | 'gray'
  isActiveData?: boolean
}

export const Badge = ({ label, color, isActiveData }: BadgeProps) => {
  return (
    <div className={makeStyles({ color })}>
      {isActiveData && <div />}
      <span>{label}</span>
    </div>
  )
}