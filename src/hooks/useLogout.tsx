import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'firebase/auth'
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
