import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png',
        'icons/apple-touch-icon.png',
        'robots.txt',
        'offline.html'
      ],
      manifest: {
        name: 'Sanskrit Grammar – Words & Guidance',
        short_name: 'Sanskrit',
        description: 'Learn Sanskrit grammar with AI-powered spiritual guidance.',
        theme_color: '#1a0a00',
        background_color: '#1a0a00',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/openrouter\.ai\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        navigateFallback: '/offline.html'
      }
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
});
