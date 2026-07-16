import { defineConfig } from 'vite';

export default defineConfig({
  base: '/gsfc/',  // Important for GitHub Pages subpath
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {  // ← Must be a function
          if (id.includes('@supabase')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true
  }
});
