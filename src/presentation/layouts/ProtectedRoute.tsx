import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../contexts/authContext'

export const ProtectedRoute = () => {
  const { loggedUser, loading } = useAuth()

  if (loading) return null

  if (!loggedUser) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
