import { useMutation } from '@tanstack/react-query'
import { auth } from '@tutu-services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


interface RegisterParams {
  fullName: string
  email: string
  password: string
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ fullName, email, password }: RegisterParams) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        })
      }

      return userCredential.user
    }
  })
}