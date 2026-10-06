import { useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { auth } from '@tutu-services/firebase'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await signOut(auth)
    },
    onSuccess: () => {
      queryClient.clear()
      navigate('/login')
    }
  })
}