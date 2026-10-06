import { useMutation } from '@tanstack/react-query'
import type { RegisterInput } from '@tutu-domain/auth/AuthGateway'
import { authGateway } from '@tutu-infrastructure/auth/FirebaseAuthGateway'

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const userCredential = await authGateway.register(input)
      return userCredential.user
    }
  })
}
