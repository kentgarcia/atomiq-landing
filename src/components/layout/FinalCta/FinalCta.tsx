import './FinalCta.css'
import { ClassicPressButton } from '@/components/ui/PressButton/ClassicPressButton'

import { footerColumns } from '@/lib/landing'
import { useReveal } from '@/hooks/useReveal'

type FinalCtaProps = {
  year?: number
  displayedCount: number
  isCountReady: boolean
  onExcited: () => void
}

export function FinalCta({ year, displayedCount, isCountReady, onExcited }: FinalCtaProps) {
  // Year passed from route loader (SSR-safe, same on server/client).
  // Falls back to client year only if loader data is unavailable.
  const ref = useReveal<HTMLDivElement>(0.2)
  const displayYear = year ?? new Date().getFullYear()

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="final reveal" id="download">
      <div className="final-rays" aria-hidden="true" />

      <section className="final-cta" aria-label="Download AtomIQ">
        <div className="final-inner">
          <div className="final-counter reveal-child" role="status" aria-live="polite" aria-busy={!isCountReady}>
            {isCountReady ? (
              <>
                <span key={displayedCount} className="final-counter__count final-counter__count--pop">
                  {displayedCount.toLocaleString()}
                </span>
                <span>{displayedCount === 1 ? 'excited click' : 'excited clicks'} and counting</span>
              </>
            ) : (
              <>
                <span className="final-counter__skeleton" aria-hidden="true" />
                <span className="final-counter__loading-text">counting excitement…</span>
              </>
            )}
          </div>

          <h2 className="final-title reveal-child" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
            Think Nuclear Science Is Just What You Know?{' '}
            <span className="final-highlight">Think Again.</span>
          </h2>
          <p className="final-sub reveal-child" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
            Explore AtomIQ and discover what&rsquo;s really inside the world of the atom.
          </p>

          <div className="final-actions reveal-child" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
            <ClassicPressButton ariaLabel="Atomiq app coming soon" onClick={onExcited}>
              Coming Soon
            </ClassicPressButton>
          </div>
        </div>
      </section>

      <footer className="final-footer" aria-label="Footer">
        <div className="final-footer__inner">
          <div className="final-footer__top">
            <div className="final-footer__brand">
              <a className="final-footer__logo" href="/" aria-label="AtomIQ home">
                <img src="/icon-128.png" alt="AtomIQ logo" width={40} height={40} loading="lazy" decoding="async" />
                <span>AtomIQ</span>
              </a>
              <p className="final-footer__tagline">
                Making nuclear science clear, playful, and for everyone.
              </p>
            </div>

            <nav className="final-footer__nav" aria-label="Footer">
              {footerColumns.map((column) => (
                <div key={column.title} className="final-footer__col">
                  <p className="final-footer__title">{column.title}</p>
                  <ul className="final-footer__list">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a className="final-footer__a" href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="final-footer__bottom">
            <p className="final-footer__copy">© {displayYear} AtomIQ. All rights reserved.</p>
            <button type="button" className="final-footer__top-btn" onClick={scrollToTop}>
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
