import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Set base to '/' for root deployment (e.g. Vercel).
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
