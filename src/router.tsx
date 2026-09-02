import { createBrowserRouter } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { LogIn } from './pages/LogIn'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { PageNotFound } from './pages/PageNotFound'
import { Transactions } from './pages/Transactions'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './layouts/ProtectedRoute'

export const router = createBrowserRouter([
  // Rotas Púbicas
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },

  // Rotas Protegidas
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/transferencias',
            element: <Transactions />,
          },
          {
            path: '/perfil',
            element: <Profile />,
          },
          {
            path: '*',
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
])