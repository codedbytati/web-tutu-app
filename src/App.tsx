import { RouterProvider } from 'react-router'
import { router } from './router'

// Exemplo de inclusão de Provedores Globais
export function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <ThemeProvider>
           <RouterProvider router={router} />
    //   </ThemeProvider>
    // </QueryClientProvider>
  )
}