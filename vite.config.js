import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  preview: {
    allowedHosts: ['myportfolio-jsbz.onrender.com'],
    port: 4173,     
  }
})
