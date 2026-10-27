import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useCreateTransaction } from './useCreateTransaction'
import { queryKeys } from '../queryKeys'

const { post } = vi.hoisted(() => ({
  post: vi.fn()
}))

vi.mock('@tutu-services/api', () => ({
  api: { post }
}))

describe('useCreateTransaction', () => {
  it('invalidates accounts and transactions after creation', async () => {
    const queryClient = new QueryClient()
    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
    post.mockResolvedValue({
      data: { result: { id: 'transaction-id', value: -50 } }
    })
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useCreateTransaction(), { wrapper })

    result.current.mutate({
      accountId: 'account-id',
      value: 50,
      type: 'DEBIT'
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.transactions
    })
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.accounts
    })
  })
})
