import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import './Introduction.css'
import { useReveal } from '@/hooks/useReveal'

interface AppScreen {
  key: string
  src: string
  alt: string
  tab: string
  title: string
  text: string
  accent: 'orange' | 'blue' | 'purple' | 'red' | 'green' | 'pink'
}

const screens: AppScreen[] = [
  {
    key: 'map',
    src: '/images/mockup/mockup-map.webp',
    alt: 'AtomIQ learning map with lesson stages and progress path',
    tab: 'Lessons',
    title: 'Learning Map',
    text: 'Follow a playful path of stages, checkpoints, and rewards as you level up.',
    accent: 'orange',
  },
  {
    key: 'discovery',
    src: '/images/mockup/mockup-discovery.webp',
    alt: 'AtomIQ Discover tab with nuclear science articles and categories',
    tab: 'Discover',
    title: 'Discover Feed',
    text: 'Browse bite-size stories — from atomic history to real-world breakthroughs.',
    accent: 'blue',
  },
  {
    key: 'minigames',
    src: '/images/mockup/mockup-minigames.webp',
    alt: 'AtomIQ minigames selection screen with game cards',
    tab: 'Minigames',
    title: 'Minigames',
    text: 'Learn by playing — match, sort, and solve your way through the atom.',
    accent: 'purple',
  },
  {
    key: 'quiz',
    src: '/images/mockup/mockup-quiz.webp',
    alt: 'AtomIQ true-or-false quiz screen with answer feedback',
    tab: 'Quiz',
    title: 'Quick Quizzes',
    text: 'Test yourself with true-or-false challenges and instant explanations.',
    accent: 'red',
  },
  {
    key: 'assistant',
    src: '/images/mockup/mockup-assistant.webp',
    alt: 'Shrodi AI assistant chat answering a nuclear science question',
    tab: 'Shrodi',
    title: 'Shrodi Assistant',
    text: 'Ask anything — Shrodi answers, guides, and cheers you on.',
    accent: 'green',
  },
  {
    key: 'profile',
    src: '/images/mockup/mockup-profile.webp',
    alt: 'AtomIQ profile screen with XP, streaks, badges, and progress',
    tab: 'Profile',
    title: 'Profile & Progress',
    text: 'Track XP, streaks, badges, and everything you have discovered.',
    accent: 'pink',
  },
]

export function Introduction() {
  const sectionRef = useReveal<HTMLElement>(0.1)
  // Start on the Discover feed — the heart of this section.
  const [active, setActive] = useState(1)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = screens.length
  const screen = screens[active]!

  // Auto-tour the 6 screens; pauses on hover/focus and for reduced motion.
  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count)
    }, 5000)
    return () => window.clearInterval(id)
  }, [paused, count])

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + count) % count)

  return (
    <section ref={sectionRef} className="intro reveal" id="about" aria-label="Introduction">
      <div className="intro-inner">
        <div className="intro-grid">
          <div className="intro-copy reveal-child">
            <p className="intro-eyebrow">Discover nuclear science</p>
            <h2 className="intro-title">
              A New Way to Explore the World of the Atom.
            </h2>
            <p className="intro-text">
              Take a tour of the real app — lessons, stories, games, quizzes,
              Shrodi, and your progress, all in one playful universe.
            </p>

            <article
              className={`intro-feature intro-feature--${screen.accent}`}
              aria-live="polite"
            >
              <h3 key={screen.key} className="intro-feature__title">
                {screen.title}
              </h3>
              <p key={`${screen.key}-text`} className="intro-feature__text">
                {screen.text}
              </p>
            </article>

            <div className="intro-nav">
              <button
                type="button"
                className="intro-arrow"
                onClick={() => go(-1)}
                aria-label="Previous screen"
              >
                ‹
              </button>
              <span className="intro-count" aria-hidden="true">
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="intro-arrow"
                onClick={() => go(1)}
                aria-label="Next screen"
              >
                ›
              </button>
            </div>
          </div>

          <div
            className="intro-visual reveal-child"
            style={{ '--i': 1 } as CSSProperties}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
              touchX.current = null
            }}
          >
            <div className="intro-stage__glow" aria-hidden="true" />
            <div className="iphone" role="img" aria-label={screen.alt}>
              <span className="iphone__btn iphone__btn--mute" aria-hidden="true" />
              <span className="iphone__btn iphone__btn--vol-up" aria-hidden="true" />
              <span className="iphone__btn iphone__btn--vol-down" aria-hidden="true" />
              <span className="iphone__btn iphone__btn--power" aria-hidden="true" />
              <div className="iphone__screen">
                {screens.map((s, i) => (
                  <img
                    key={s.key}
                    src={s.src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    loading={s.key === 'discovery' ? 'eager' : 'lazy'}
                    decoding="async"
                    className={i === active ? 'is-active' : ''}
                  />
                ))}
                <span className="iphone__island" aria-hidden="true">
                  <span className="iphone__lens" aria-hidden="true" />
                </span>
                <span className="iphone__home" aria-hidden="true" />
              </div>
            </div>
            <div className="intro-progress" aria-hidden="true">
              <span key={screen.key} className={paused ? 'is-paused' : ''} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
