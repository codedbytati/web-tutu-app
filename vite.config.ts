import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    }
  },
  resolve: {
    alias: {
      '@tutu-ui': path.resolve(import.meta.dirname, './src/presentation/ui'),
      '@tutu-components': path.resolve(
        import.meta.dirname,
        './src/presentation/components'
      ),
      '@tutu-schemas': path.resolve(import.meta.dirname, './src/schemas'),
      '@tutu-hooks': path.resolve(
        import.meta.dirname,
        './src/presentation/hooks'
      ),
      '@tutu-services': path.resolve(import.meta.dirname, './src/services'),
      '@tutu-contexts': path.resolve(import.meta.dirname, './src/contexts'),
      '@tutu-data': path.resolve(import.meta.dirname, './src/data'),
      '@tutu-domain': path.resolve(import.meta.dirname, './src/domain')
    }
  }
})
