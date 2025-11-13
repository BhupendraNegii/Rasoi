import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
  ],
  server: {
    port: 5174
  }
})
