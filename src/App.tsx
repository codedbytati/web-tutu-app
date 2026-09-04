import { RouterProvider } from 'react-router'
import { router } from './router'
import { AuthProvider } from './contexts/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {/*   <ThemeProvider> */}
        <RouterProvider router={router} />
        {/*   </ThemeProvider> */}
      </QueryClientProvider>
    </AuthProvider>
  )
}
