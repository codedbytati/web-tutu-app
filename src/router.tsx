import { createBrowserRouter } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { LogIn } from './pages/LogIn'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { PageNotFound } from './pages/PageNotFound'
import { Transfers } from './pages/Transfers'

export const router = createBrowserRouter([
  // Rotas de Autenticação (Páginas "limpas", sem Sidebar)
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Rotas da Aplicação Autenticada (Todas terão a Sidebar)
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
      {
        path: '/transferencias',
        element: <Transfers />,
      }
    ],
  },
])