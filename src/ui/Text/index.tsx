import { createElement, type ElementType, type ComponentPropsWithoutRef } from 'react'
import { tv } from 'tailwind-variants'

type FontAppearanceKeys = 'display' | 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption' | 'overline'

type TextProps<T extends ElementType = 'p'> = {
  as?: T
  appearance?: FontAppearanceKeys
  className?: string
} & ComponentPropsWithoutRef<T>

const makeStyles = tv({
  base: '',
  variants: {
    appearance: {
      display: 'font-display font-extrabold text-[64px] tracking-tighter',
      h1: 'font-display font-bold text-[40px] tracking-[-0.04em]',
      h2: 'font-display font-semibold text-[28px] tracking-[-0.03em]',
      h3: 'font-display font-semibold text-xl tracking-[-0.02em]',
      body1: 'font-body font-normal text-base leading-relaxed',
      body2: 'font-body font-normal text-sm',
      caption: 'font-body font-normal text-xs',
      overline: 'font-body font-medium text-[11px] tracking-wider uppercase'
    }
  }
})

const getTag = (appearance: FontAppearanceKeys): ElementType => {
  switch (appearance) {
    case 'display':
    case 'body1':
    case 'body2':
    case 'caption':
    case 'overline':
      return 'p'
    default:
      return appearance
  }
}

export const Text = <T extends ElementType = 'p'>({
  as,
  appearance = 'body1',
  className,
  children,
  ...props
}: TextProps<T>) => {
  const targetTag = as ?? getTag(appearance)
  const styles = makeStyles({ appearance, className })

  return createElement(targetTag, { className: styles, ...props }, children)
}