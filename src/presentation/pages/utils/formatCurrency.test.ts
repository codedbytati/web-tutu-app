import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats positive amounts using Brazilian currency notation', () => {
    expect(formatCurrency(5700)).toBe('5.700,00')
  })

  it('keeps invalid values safe for presentation', () => {
    expect(formatCurrency('invalid')).toBe('0,00')
  })
})
