import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Newsfeed/',
  server: {
    proxy: {
      // 📰 Proxy for NewsAPI
      '/newsapi': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newsapi/, ''),
      },

      // 🖼️ Proxy for Unsplash API
      '/unsplash': {
        target: 'https://api.unsplash.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/unsplash/, ''),
      },
    },
  },
});

