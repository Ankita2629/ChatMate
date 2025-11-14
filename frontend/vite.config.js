// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   build: {
    chunkSizeWarningLimit: 1600, // increase limit from 500 KB to 1600 KB
  },
});
