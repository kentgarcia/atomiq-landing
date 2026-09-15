import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      srcDirectory: 'src',
      // Static prerendering for the marketing landing page (`ssr-prerender`):
      // `/` has no request-time data beyond a best-effort counter with a
      // graceful fallback, so it can be prerendered at build time and
      // revalidated via the route's Cache-Control headers (ISR).
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
        concurrency: 14,
      },
    }),
    // Nitro builds the Vercel serverless output (`.output/`).
    // Keep before viteReact so client transforms apply last.
    nitro(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
