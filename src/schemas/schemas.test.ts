import { describe, expect, it } from 'vitest'
import { loginSchema } from './loginSchema'
import { registerSchema } from './registerSchema'

describe('authentication schemas', () => {
  it('accepts valid login credentials', () => {
    expect(
      loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123'
      }).success
    ).toBe(true)
  })

  it('rejects invalid login credentials', () => {
    expect(
      loginSchema.safeParse({ email: 'invalid', password: '123' }).success
    ).toBe(false)
  })

  it('requires a complete name during registration', () => {
    expect(
      registerSchema.safeParse({
        fullName: 'Tati Silva',
        email: 'tati@example.com',
        password: 'password123'
      }).success
    ).toBe(true)
  })
})
