import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This makes the server accessible on the network
    port: 5173,      // Optional: Specify the port
    proxy: {
      '/api': 'http://192.168.100.5:4000', // Adjust this to your backend API server's URL
    }
  }
})
