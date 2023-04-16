import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 80,
  },
  plugins: [react()],
})
