import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@tutu-domain': path.resolve(import.meta.dirname, './src/domain'),
      '@tutu-data': path.resolve(import.meta.dirname, './src/data'),
      '@tutu-services': path.resolve(import.meta.dirname, './src/services'),
      '@tutu-ui': path.resolve(import.meta.dirname, './src/presentation/ui'),
      '@tutu-components': path.resolve(
        import.meta.dirname,
        './src/presentation/components'
      )
    }
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/backend/**'],
    setupFiles: ['./src/testSetup.ts']
  }
})
