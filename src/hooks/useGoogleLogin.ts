import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../services/firebase'

export const useGoogleLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    },
    onSuccess: () => {
      navigate('/')
    }
  })
}
