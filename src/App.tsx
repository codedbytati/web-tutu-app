import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { AuthProvider } from './contexts/authContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { GlobalToasts } from '@tutu-ui/Toast'
import { queryClient } from './services/queryClient'

export function App() {
  return (
    <AuthProvider>
      <GlobalToasts />
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className='flex min-h-screen items-center justify-center'>
              Carregando...
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </AuthProvider>
  )
}
