import { useMutation } from '@tanstack/react-query'
import { authGateway } from '@tutu-infrastructure/auth/FirebaseAuthGateway'

interface LoginParams {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const userCredential = await authGateway.login(email, password)
      return userCredential.user
    }
  })
}
