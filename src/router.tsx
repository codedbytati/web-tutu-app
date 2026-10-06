import { createBrowserRouter } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { ProtectedRoute } from './layouts/ProtectedRoute'
import {
  Accounts,
  Analysis,
  Home,
  LogIn,
  PageNotFound,
  Profile,
  Register,
  Transactions
} from './routePages'

export const router = createBrowserRouter([
  // Rotas Púbicas
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/cadastro',
    element: <Register />
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
            element: <Home />
          },
          {
            path: '/transacoes',
            element: <Transactions />
          },
          {
            path: '/analises',
            element: <Analysis />
          },
          {
            path: '/cartoes',
            element: <Accounts />
          },
          {
            path: '/perfil',
            element: <Profile />
          },
          {
            path: '*',
            element: <PageNotFound />
          }
        ]
      }
    ]
  }
])
