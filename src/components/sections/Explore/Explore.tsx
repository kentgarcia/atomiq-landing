import { useState } from 'react'
import './Explore.css'
import { ShrodiModal } from './ShrodiModal'

const features = [
  {
    key: 'lessons',
    title: 'Interactive Lessons',
    text: 'Break down nuclear science concepts into easy-to-follow learning units.',
    accent: 'orange' as const,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5ZM6.5 3A2.5 2.5 0 0 0 4 5.5V20.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M8 7.5h8M8 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'myths',
    title: 'Myth Smashers',
    text: 'Challenge common misconceptions and find out what the science really says.',
    accent: 'red' as const,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="m13.5 4.5 6 6L11 19l-6-6 8.5-8.5Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="m13.5 4.5 6 6L11 19l-6-6 8.5-8.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 9.5l5 5M4 20l3.5-3.5M17 4l3-1 1 3-3 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'maze',
    title: 'Atom Maze',
    text: 'Learn through an interactive game with progression, challenges, and rewards.',
    accent: 'blue' as const,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.18" />
        <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M7 8h4v4H7zM13 12h4v4h-4zM7 14v3M17 7v3M11 8v2M13 8v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'encyclopedia',
    title: 'Nuclear Encyclopedia',
    text: 'Explore concepts, terms, and additional scientific information.',
    accent: 'purple' as const,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity="0.18" />
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="12" cy="12" rx="3.8" ry="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M3.5 12h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function Explore() {
  const [shrodiOpen, setShrodiOpen] = useState(false)

  return (
    <section className="explore" id="features" aria-label="Explore nuclear science">
      <div className="explore-inner">
        <div className="explore-head">
          <p className="explore-eyebrow">Explore nuclear science</p>
          <h2 className="explore-title">
            Learn It. <span className="explore-highlight">Play It.</span> Discover It.
          </h2>
          <p className="explore-sub">
            Step inside the AtomIQ universe — everything you can do, orbiting around one playful core.
          </p>
        </div>

        <div className="explore-universe">
          <div className="explore-column">
            {features.slice(0, 2).map((feature, index) => (
              <article
                key={feature.key}
                className={`explore-card explore-card--${feature.accent} explore-float--${index + 1}`}
              >
                <span className="explore-card__icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="explore-card__title">{feature.title}</h3>
                <p className="explore-card__text">{feature.text}</p>
              </article>
            ))}
          </div>

          <div className="explore-core" id="shrodi" aria-label="Meet Shrodi">
            <div className="explore-core__glow" aria-hidden="true" />
            <div className="explore-core__ring explore-core__ring--1" aria-hidden="true">
              <span className="explore-core__electron" />
            </div>
            <div className="explore-core__ring explore-core__ring--2" aria-hidden="true">
              <span className="explore-core__electron" />
            </div>
            <span className="explore-core__badge">Meet Shrodi</span>
            <img
              className="explore-core__mascot"
              src="/images/mascot/happy.png"
              alt="Shrodi, the AtomIQ mascot, cheering with arms up"
              width={360}
              height={397}
              loading="lazy"
            />
            <h3 className="explore-core__title">Meet Shrodi, Your Learning Companion</h3>
            <p className="explore-core__text">
              Shrodi stays by your side as you learn — guiding each step, cheering your progress, and making nuclear science feel friendly.
            </p>

            <button
              type="button"
              className="explore-core__cta"
              onClick={() => setShrodiOpen(true)}
            >
              Learn with Shrodi <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="explore-column">
            {features.slice(2).map((feature, index) => (
              <article
                key={feature.key}
                className={`explore-card explore-card--${feature.accent} explore-float--${index + 3}`}
              >
                <span className="explore-card__icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="explore-card__title">{feature.title}</h3>
                <p className="explore-card__text">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <ShrodiModal open={shrodiOpen} onClose={() => setShrodiOpen(false)} />
    </section>
  )
}
