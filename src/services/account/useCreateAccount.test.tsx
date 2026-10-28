import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCreateAccount } from './useCreateAccount'
import { queryKeys } from '../queryKeys'

const { post } = vi.hoisted(() => ({ post: vi.fn() }))

vi.mock('@tutu-services/api', () => ({
  api: { post }
}))

describe('useCreateAccount', () => {
  it('invalidates financial queries after creating an account', async () => {
    const queryClient = new QueryClient()
    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
    post.mockResolvedValue({ data: { result: { id: 'account-id' } } })
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useCreateAccount(), { wrapper })

    await result.current.mutateAsync({
      bank: 'NUBANK',
      nickname: 'Principal',
      type: 'CURRENT',
      balance: 100
    })

    await waitFor(() => {
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.accounts
      })
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.transactions
      })
    })
  })
})
