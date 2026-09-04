import { tv } from 'tailwind-variants'

export const makeStyles = tv({
  slots: {
    base: 'group relative flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-colors',
    icon: 'size-6 transition-colors',
    label: 'font-display font-semibold text-sm transition-colors'
  },
  variants: {
    color: {
      violet: 'bg-primary',
      mint: 'bg-positive',
      sky: 'bg-info',
      amber: 'bg-warning',
      coral: 'bg-negative'
    },
    isActive: {
      false: {
        base: 'bg-transparent hover:bg-background',
        icon: 'text-muted-foreground group-hover:text-foreground',
        label: 'text-muted-foreground group-hover:text-foreground'
      },
      true: {
        base: [
          'cursor-default after:absolute after:right-3 after:size-2',
          'after:bg-card/60 after:rounded-full'
        ],
        icon: 'text-card group-hover:text-card',
        label: 'text-card group-hover:text-card'
      }
    }
  },
  compoundVariants: [
    { isActive: true, color: 'violet', slots: { base: 'bg-primary' } },
    { isActive: true, color: 'mint', slots: { base: 'bg-positive' } },
    { isActive: true, color: 'sky', slots: { base: 'bg-info' } },
    { isActive: true, color: 'amber', slots: { base: 'bg-warning' } },
    { isActive: true, color: 'coral', slots: { base: 'bg-negative' } }
  ]
})
