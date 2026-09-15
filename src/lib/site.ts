/**
 * Shared public site config — client-safe.
 * Per `file-separation`: `.ts` files hold shared types/utilities
 * safe to import anywhere (server or client).
 *
 * Only expose `VITE_`-prefixed env vars here. Secrets live in
 * `env.server.ts` and must never be imported on the client.
 */

export const siteConfig = {
  name: 'AtomIQ',
  tagline: 'Making nuclear science clear, playful, and for everyone.',
  url: import.meta.env.VITE_APP_URL ?? 'http://localhost:3000',
} as const

export type SiteConfig = typeof siteConfig
