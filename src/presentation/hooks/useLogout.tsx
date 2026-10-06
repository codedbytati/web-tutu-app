import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authGateway } from '@tutu-infrastructure/auth/FirebaseAuthGateway'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await authGateway.logout()
    },
    onSuccess: () => {
      queryClient.clear()
      navigate('/login')
    }
  })
}
