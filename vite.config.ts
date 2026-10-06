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
      '@tutu-ui': path.resolve(__dirname, './src/presentation/ui'),
      '@tutu-components': path.resolve(__dirname, './src/presentation/components'),
      '@tutu-schemas': path.resolve(__dirname, './src/schemas'),
      '@tutu-hooks': path.resolve(__dirname, './src/presentation/hooks'),
      '@tutu-services': path.resolve(__dirname, './src/services'),
      '@tutu-contexts': path.resolve(__dirname, './src/contexts'),
      '@tutu-data': path.resolve(__dirname, './src/data'),
      '@tutu-domain': path.resolve(__dirname, './src/domain')
    }
  }
})
