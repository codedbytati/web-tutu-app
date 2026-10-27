import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@tutu-services/api'
import endpoints from './endpoints'
import { invalidateFinancialQueries } from '../queryClient'

export const useDeactivateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (accountId: string) => {
      await api.patch(
        endpoints.deactivateAccount.replace(':accountId', accountId)
      )
    },
    onSuccess: () => invalidateFinancialQueries(queryClient)
  })
}
