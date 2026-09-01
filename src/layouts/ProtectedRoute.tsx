import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/authContext'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}