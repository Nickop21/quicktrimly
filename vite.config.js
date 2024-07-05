import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      external: ['@/db/apiClicks']
    }
  }
});