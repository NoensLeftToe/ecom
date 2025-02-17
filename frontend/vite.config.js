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
          // Prevent empty chunks by grouping only useful dependencies
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0];
            // Only chunk larger or frequently used packages
            if (packageName === 'react' || packageName === 'react-dom') {
              return 'react';
            }
            if (packageName === 'axios' || packageName === 'redux') {
              return 'vendor';
            }
            return null; // Prevent unnecessary chunking for unused or small packages
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
