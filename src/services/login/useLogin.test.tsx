import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useLogin } from './useLogin'

const { signInWithEmailAndPassword } = vi.hoisted(() => ({
  signInWithEmailAndPassword: vi.fn()
}))

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword
}))

vi.mock('@tutu-services/firebase', () => ({
  auth: {}
}))

describe('useLogin', () => {
  it('returns the authenticated user', async () => {
    const user = { uid: 'user-id' }
    signInWithEmailAndPassword.mockResolvedValue({ user })
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useLogin(), { wrapper })

    result.current.mutate({
      email: 'user@example.com',
      password: 'password123'
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBe(user)
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      'user@example.com',
      'password123'
    )
  })
})
