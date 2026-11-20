import { useEffect, useState, type CSSProperties } from 'react'
import './Introduction.css'
import './screens.css'
import { useReveal } from '@/hooks/useReveal'
import { FeedScreen, LessonScreen, MapScreen, PhoneScreen } from './screens'

type Tour = {
  key: string
  tab: string
  title: string
  text: string
  color: 'yellow' | 'green' | 'blue' | 'purple'
  alt: string
  screen: () => React.ReactNode
}

const tours: Tour[] = [
  {
    key: 'map',
    tab: 'Map',
    title: 'Follow the path',
    text: 'Every unit is a winding road with its own colour and its own teacher. Walk it one node at a time.',
    color: 'yellow',
    alt: 'The AtomIQ learning map: a yellow unit card, finished nodes, and the next lesson ready to start',
    screen: () => <MapScreen />,
  },
  {
    key: 'lesson',
    tab: 'Lessons',
    title: 'Learn by answering',
    text: 'Short cards with instant feedback. Tap, match and sort, and a teacher explains why right after you answer.',
    color: 'green',
    alt: 'A lesson question from Ada about the centre of an atom, answered correctly',
    screen: () => <LessonScreen />,
  },
  {
    key: 'feed',
    tab: 'Feed',
    title: 'A cast that cheers you on',
    text: 'Seven teachers post about what you really did, and short blog pieces explain the science behind it.',
    color: 'blue',
    alt: 'The AtomIQ feed with posts from the teachers Ada and Hal',
    screen: () => <FeedScreen />,
  },
  {
    key: 'phone',
    tab: 'Phone',
    title: 'A phone inside the app',
    text: 'Chats with Shrodi, Field Notes, a scanner, a map and more. New apps unlock as you learn.',
    color: 'purple',
    alt: 'The in-app phone home screen with twelve app icons',
    screen: () => <PhoneScreen />,
  },
]

const AUTOPLAY_MS = 4500

export function Introduction() {
  const sectionRef = useReveal<HTMLElement>(0.1)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const tour = tours[active]!

  // Auto-tour the screens; pauses while hovered or focused, and with reduced motion.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % tours.length), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [paused, active])

  return (
    <section ref={sectionRef} className="intro section reveal" id="about" aria-label="A tour of the app">
      <div className="section-inner intro-grid">
        <div className="intro-copy">
          <div className="reveal-child">
            <h2 className="section-title intro-title">A New Way to Explore the World of the Atom.</h2>
            <p className="intro-text">
              Take a tour of the app: lessons you walk through, a feed that notices what you do, and a phone full of
              tools, all in one playful universe.
            </p>
          </div>

          <ul className="intro-tabs" role="tablist" aria-label="App tour">
            {tours.map((t, i) => (
              <li key={t.key} className="reveal-child" style={{ ['--i' as string]: i + 1 } as CSSProperties}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`intro-tab intro-tab--${t.color}${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                >
                  <span className="intro-tab__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="intro-tab__body">
                    <b>{t.title}</b>
                    <span className="intro-tab__text">
                      <span>{t.text}</span>
                    </span>
                  </span>
                  {i === active && (
                    <span className="intro-tab__progress" aria-hidden="true">
                      <i key={active} className={paused ? 'is-paused' : ''} style={{ ['--ms' as string]: `${AUTOPLAY_MS}ms` } as CSSProperties} />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="intro-visual reveal-child"
          style={{ ['--i' as string]: 2 } as CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="phone" role="img" aria-label={tour.alt}>
            <div className="phone__screen">
              {tours.map((t, i) => (
                <div key={t.key} className={`phone__page${i === active ? ' is-active' : ''}`} aria-hidden="true" inert={i !== active}>
                  <div className="phone__fit">{t.screen()}</div>
                </div>
              ))}
              <span className="phone__island" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
