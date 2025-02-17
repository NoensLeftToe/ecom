import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This makes the server accessible on the network
    port: 5173,      // Optional: Specify the port
    proxy: {
      '/api': 'http://192.168.100.7:4000', // Adjust this to your backend API server's URL
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group dependencies into separate chunks (e.g., node_modules packages into their own chunk)
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // Creates chunks based on package name
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,  // Increase the chunk size warning limit (1MB)
  }
})
