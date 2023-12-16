import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        rewrite: (path) => path.replace(/^\/api/, ''),
        target: 'http://backend:3000',
        changeOrigin: true,
      }
    }
  }
})
