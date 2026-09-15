import { scienceFlow, scienceLogos } from '@/lib/landing'
import './Science.css'

const logos = scienceLogos

const flow = scienceFlow

export function Science() {
  return (
    <section className="science" id="science" aria-label="Built on real science">
      <div className="science-inner">
        <div className="science-head">
          <p className="science-eyebrow">Built on real science</p>
          <h2 className="science-title">Learn From What&rsquo;s Proven.</h2>
          <p className="science-sub">
            AtomIQ brings nuclear science closer to everyone through carefully
            curated learning materials and trusted scientific references.
          </p>
        </div>

        <div className="science-stat">
          <p className="science-stat__number">48+</p>
          <p className="science-stat__label">curated sources behind every lesson, game, and answer</p>
        </div>

        <div className="science-logos" aria-label="Trusted source logos (placeholders)">
          {logos.map((logo) => (
            <div key={logo.name} className="science-logo">
              {/* Replace with permitted logo: <img src="/logos/institution.png" alt="..." /> */}
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
        <p className="science-note">
          Placeholder tiles — replace with institution or publication logos where permission is granted.
        </p>

        <ol className="science-flow" aria-label="From research to you">
          {flow.map((step, index) => (
            <li key={step} className="science-flow__item">
              <span className="science-flow__step">{step}</span>
              {index < flow.length - 1 && (
                <span className="science-flow__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <p className="science-statement">
          <strong>Every discovery starts with a source.</strong>
        </p>
        <img
          className="science-mascot"
          src="/images/mascot/idea.png"
          alt="Shrodi with a bright idea"
          width={140}
          height={154}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
