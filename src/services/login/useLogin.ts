import { useMutation } from '@tanstack/react-query'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@tutu-services/firebase'

interface LoginParams {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      return userCredential.user
    }
  })
}