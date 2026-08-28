import { createBrowserRouter } from 'react-router'
import { Register } from './pages/Register'
import { LogIn } from './pages/LogIn'
import { Home } from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
])