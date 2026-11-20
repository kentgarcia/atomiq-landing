import './Hero.css'
import { ClassicPressButton } from '@/components/ui/PressButton/ClassicPressButton'
import { objectUri } from '@/components/art/Art'
import { heroObjects } from '@/lib/landing'

type HeroProps = {
  displayedCount: number
  isCountReady: boolean
  onExcited: () => void
}

export function Hero({ displayedCount, isCountReady, onExcited }: HeroProps) {
  return (
    <section className="hero" aria-label="Intro">
      <div className="hero-rays" aria-hidden="true" />

      {heroObjects.map((o, i) => (
        <div key={o.id} className={`hero-flag prop-${i + 1}`} aria-hidden="true">
          <img src={objectUri(o.id) ?? ''} alt="" width={100} height={100} decoding="async" draggable={false} />
        </div>
      ))}

      <div className="hero-inner">
        <div className="hero-counter" role="status" aria-live="polite" aria-busy={!isCountReady}>
          {isCountReady ? (
            <>
              <span key={displayedCount} className="hero-counter__count hero-counter__count--pop">
                {displayedCount.toLocaleString()}
              </span>
              <span>{displayedCount === 1 ? 'excited click' : 'excited clicks'} and counting</span>
            </>
          ) : (
            <>
              <span className="hero-counter__skeleton" aria-hidden="true" />
              <span className="hero-counter__loading-text">counting excitement…</span>
            </>
          )}
        </div>

        <h1 className="hero-title">
          Nuclear Science Is <span className="hero-highlight">More Than You Think.</span>
        </h1>

        <p className="hero-sub">
          Nuclear science can be complex, but learning about it doesn't have to be.
          Explore, play, and discover the science behind the atom.
        </p>

        <div className="hero-cta">
          <ClassicPressButton
            ariaLabel="Atomiq app coming soon"
            onClick={onExcited}
          >
            Coming Soon
          </ClassicPressButton>
        </div>

        <div className="hero-mascot-wrap">
          <img
            className="hero-mascot"
            src="/mascot.svg"
            alt="Atomiq mascot"
            width={560}
            height={510}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
