import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  createElement
} from 'react'
import { type User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = () => signOut(auth)

  return createElement(
    AuthContext.Provider,
    { value: { loggedUser, loading, logout } },
    !loading ? children : null
  )
}

export const useAuth = () => useContext(AuthContext)
