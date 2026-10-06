import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  createElement
} from 'react'
import { type User } from 'firebase/auth'
import { authGateway } from '@tutu-infrastructure/auth/FirebaseAuthGateway'
import { queryClient } from '../services/queryClient'
import { accountsQueryOptions } from '../services/account/useGetAccounts'
import { transactionsQueryOptions } from '../services/transaction/useGetTransactions'

interface AuthContextType {
  loggedUser: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  loggedUser: null,
  loading: true,
  logout: async () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = authGateway.subscribe((currentUser) => {
      setLoggedUser(currentUser)
      setLoading(false)

      if (currentUser) {
        Promise.all([
          queryClient.prefetchQuery(accountsQueryOptions),
          queryClient.prefetchQuery(transactionsQueryOptions)
        ]).catch((error: unknown) => {
          console.error('Falha ao pré-carregar dados da aplicação.', error)
        })
      } else {
        queryClient.clear()
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = () => authGateway.logout()

  return createElement(
    AuthContext.Provider,
    { value: { loggedUser, loading, logout } },
    !loading ? children : null
  )
}

export const useAuth = () => useContext(AuthContext)
