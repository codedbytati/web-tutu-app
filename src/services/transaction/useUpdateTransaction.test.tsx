import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useUpdateTransaction } from './useUpdateTransaction'
import { queryKeys } from '../queryKeys'

const { put } = vi.hoisted(() => ({
  put: vi.fn()
}))

vi.mock('@tutu-services/api', () => ({
  api: { put }
}))

describe('useUpdateTransaction', () => {
  it('waits for financial queries to be invalidated after updating', async () => {
    const queryClient = new QueryClient()
    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
    put.mockResolvedValue({
      data: { result: { id: 'transaction-id', value: 100 } }
    })
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useUpdateTransaction(), { wrapper })

    await result.current.mutateAsync({
      id: 'transaction-id',
      value: 100,
      type: 'CREDIT'
    })

    await waitFor(() => {
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.transactions
      })
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.accounts
      })
    })
  })
})
