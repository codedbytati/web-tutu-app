import { tv, type VariantProps } from 'tailwind-variants'

export const toastRegionStyles = tv({
  base: 'fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none'
})

export const toastStyles = tv({
  base: [
    'pointer-events-auto flex items-start gap-3 rounded-lg border-l-6 bg-white',
    'p-4 shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4',
    '[&_svg]:rounded-xl [&_svg]:p-1'
  ],
  variants: {
    status: {
      info: 'border-l-info [&_svg]:text-info [&_svg]:bg-info/20',
      success: 'border-l-positive [&_svg]:text-positive [&_svg]:bg-positive/20',
      error: 'border-l-negative [&_svg]:text-negative [&_svg]:bg-negative/20',
      warning: 'border-l-warning [&_svg]:text-warning [&_svg]:bg-warning/20',
      neutral: 'border-l-primary [&_svg]:text-primary [&_svg]:bg-primary/20'
    }
  },
  defaultVariants: {
    status: 'neutral'
  }
})

export type ToastVariants = VariantProps<typeof toastStyles>
