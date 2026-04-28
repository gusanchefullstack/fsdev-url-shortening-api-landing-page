import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/shorten': {
        target: 'https://cleanuri.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shorten/, '/shorten'),
      },
    },
  },
})
