import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { authGateway } from '@tutu-infrastructure/auth/FirebaseAuthGateway'

export const useGoogleLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      const result = await authGateway.loginWithGoogle()
      return result.user
    },
    onSuccess: () => {
      navigate('/')
    }
  })
}
