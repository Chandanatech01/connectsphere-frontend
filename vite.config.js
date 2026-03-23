import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'https://connectsphere-backend-vopj.onrender.com' , changeOrigin: true },
      '/oauth2': { target: 'https://connectsphere-backend-vopj.onrender.com' , changeOrigin: true },
    },
  },
})
