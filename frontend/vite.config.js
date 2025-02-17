import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // Ensure this matches where you're running Vite
    proxy: {
      '/api': {
        target: 'http://192.168.100.7:4000', // Adjust this to your backend API server's URL
        changeOrigin: true,
        secure: false,
      },
    },
    mimeTypes: {
      '.js': 'application/javascript',
      '.jsx': 'application/javascript',
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
  },
  optimizeDeps: {
    exclude: ['some-broken-package'], // If a package is causing issues, add it here
  }
});
