import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// base './' + HashRouter means the build works from any GitHub Pages path (user or project site).
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon.svg'],
      manifest: {
        name: 'Mise — plan, eat, train',
        short_name: 'Mise',
        description: 'Personal nutrition, meal planning, smart shopping and fitness tracking.',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FFFFFF',
        theme_color: '#9C51B6',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: ['ocr/**'],
        maximumFileSizeToCacheInBytes: 3_000_000,
        navigateFallback: 'index.html',
        runtimeCaching: [
          { urlPattern: /\/ocr\//, handler: 'CacheFirst', options: { cacheName: 'mise-ocr', expiration: { maxEntries: 10 } } },
          { urlPattern: /\/data\/foods\.json$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'mise-foods' } },
          { urlPattern: /^https:\/\/world\.openfoodfacts\.org\//, handler: 'NetworkFirst', options: { cacheName: 'mise-off', networkTimeoutSeconds: 6, expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 } } },
        ],
      },
    }),
  ],
  build: { chunkSizeWarningLimit: 900 },
})
