import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero/Hero'
import { Introduction } from '@/components/sections/Introduction/Introduction'
import { Explore } from '@/components/sections/Explore/Explore'
import { ShrodiChat } from '@/components/sections/ShrodiChat/ShrodiChat'
import { Challenge } from '@/components/sections/Challenge/Challenge'
import { Journey } from '@/components/sections/Journey/Journey'
import { Team } from '@/components/sections/Team/Team'
import { Faq } from '@/components/sections/Faq/Faq'
import { FinalCta } from '@/components/layout/FinalCta/FinalCta'
import { randomStartCount, useExcitedCounter } from '@/hooks/useExcitedCounter'

export const Route = createFileRoute('/')({
  // Full SSR (default) — landing page is SEO-critical (`ssr-selective`: keep `true`).
  // The counter has no backend: the loader picks its starting point (700,000–950,000) once,
  // and the value is serialized so server and client render the same number.
  loader: () => ({ excitedCount: randomStartCount(), year: new Date().getFullYear() }),
  // ISR: cache the prerendered landing at the CDN for 60s, serve stale
  // while revalidating for 5min (`ssr-prerender`). Count stays fresh
  // enough for a marketing page without SSR-ing every request.
  headers: () => ({
    'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
  }),
  staleTime: 30_000,
  gcTime: 5 * 60_000,
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'AtomIQ turns nuclear science into interactive lessons, games, challenges, and trusted references — so you can understand the science beyond the myths.',
      },
      { property: 'og:title', content: 'AtomIQ — Nuclear Science Is More Than You Think' },
      {
        property: 'og:description',
        content: 'Explore, play, and discover the science behind the atom.',
      },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: Home,
})

function Home() {
  // Loader data is serialized during SSR and hydrated on the client,
  // so server and client render the same count/year (`ssr-hydration-safety`).
  // Single shared counter — Hero + FinalCta stay in sync.
  const { excitedCount, year } = Route.useLoaderData()
  const { displayedCount, isCountReady, handleExcited } = useExcitedCounter(excitedCount)
  return (
    <main style={{ margin: 0, background: 'var(--bg)' }}>
      <div className="scroll-progress" aria-hidden="true" />
      <Hero displayedCount={displayedCount} isCountReady={isCountReady} onExcited={handleExcited} />
      <Introduction />
      <Explore />
      <ShrodiChat />
      <Challenge />
      <Journey />
      <Team />
      <Faq />
      <FinalCta
        year={year}
        displayedCount={displayedCount}
        isCountReady={isCountReady}
        onExcited={handleExcited}
      />
    </main>
  )
}
