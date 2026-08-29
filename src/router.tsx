import { createBrowserRouter } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
// import { LogIn } from './pages/LogIn'
// import { Register } from './pages/Register'
import { Home } from './pages/Home'

export const router = createBrowserRouter([
  // Rotas de Autenticação (Páginas "limpas", sem Sidebar)
  // {
  //   path: '/login',
  //   element: <LogIn />,
  // },
  // {
  //   path: '/register',
  //   element: <Register />,
  // },

  // Rotas da Aplicação Autenticada (Todas terão a Sidebar)
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true, // Corresponde à rota "/"
        element: <Home />,
      },
    ],
  },

  // Rota 404
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
])