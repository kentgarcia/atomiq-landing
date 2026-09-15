import type { ReactNode } from 'react'
import {
  Link,
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import '../styles/globals.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'AtomIQ — Nuclear Science Is More Than You Think',
      },
      {
        name: 'description',
        content:
          'AtomIQ turns nuclear science into interactive lessons, games, challenges, and trusted references.',
      },
    ],
    links: [
      {
        rel: 'preload',
        href: '/icon-128.png',
        as: 'image',
        type: 'image/png',
        fetchpriority: 'high',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/icon.png',
      },
    ],
  }),
  // Consistent 404 experience (`err-not-found`): unmatched URLs render
  // this instead of a blank page or a crash.
  notFoundComponent: NotFound,
  // Graceful failure boundary for SSR/loader errors.
  errorComponent: RootError,
  component: RootComponent,
})

function NotFound() {
  return (
    <main style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <p style={{ fontWeight: 700, letterSpacing: '0.08em' }}>404</p>
      <h1>Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/">Go home</Link>
    </main>
  )
}

function RootError({ error }: { error: unknown }) {
  return (
    <main style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error instanceof Error ? error.message : 'An unexpected error occurred.'}</p>
      <Link to="/">Go home</Link>
    </main>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <Navbar />
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
