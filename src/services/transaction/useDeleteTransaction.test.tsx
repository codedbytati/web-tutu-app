import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDeleteTransaction } from './useDeleteTransaction'
import { queryKeys } from '../queryKeys'

const { deleteTransaction } = vi.hoisted(() => ({
  deleteTransaction: vi.fn()
}))

vi.mock('@tutu-services/api', () => ({
  api: { delete: deleteTransaction }
}))

describe('useDeleteTransaction', () => {
  it('invalidates financial queries after deletion', async () => {
    const queryClient = new QueryClient()
    const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
    deleteTransaction.mockResolvedValue(undefined)
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useDeleteTransaction(), { wrapper })

    await result.current.mutateAsync('transaction-id')

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
