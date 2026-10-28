import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCreateCreditCard } from './useCreateCreditCard'
import { queryKeys } from '../queryKeys'

const { post } = vi.hoisted(() => ({ post: vi.fn() }))

vi.mock('@tutu-services/api', () => ({
  api: { post }
}))

describe('useCreateCreditCard', () => {
  it('invalidates financial queries after creating a card', async () => {
    const queryClient = new QueryClient()
    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
    post.mockResolvedValue({ data: { result: { id: 'card-id' } } })
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useCreateCreditCard(), { wrapper })

    await result.current.mutateAsync({
      bank: 'NUBANK',
      nickname: 'Principal',
      limit: 1000
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
