import type { CSSProperties } from 'react'
import { journeyMilestones } from '@/lib/landing'
import { useReveal } from '@/hooks/useReveal'
import { Glyph } from '@/components/art/Art'
import './Journey.css'

const milestones = journeyMilestones

/** Each stop wears a unit colour and a lesson-map picture, like nodes on the app's path. */
const STOPS = {
  blue: { glyph: 'trophy', tone: 'blue' },
  orange: { glyph: 'star', tone: 'yellow' },
  red: { glyph: 'flask', tone: 'red' },
} as const

export function Journey() {
  const sectionRef = useReveal<HTMLElement>(0.1)

  return (
    <section ref={sectionRef} className="journey section reveal" id="our-story" aria-label="From the Philippines to the world">
      <div className="section-inner">
        <div className="section-head reveal-child">
          <h2 className="section-title">A Student-Built Idea That Went Beyond the Classroom.</h2>
          <p className="section-sub">
            What started as a project to make nuclear science easier to understand grew into an opportunity to represent
            the Philippines on the international stage.
          </p>
        </div>

        <ol className="jr-road">
          {milestones.map((m, i) => {
            const stop = STOPS[m.accent]
            return (
              <li key={m.step} className={`jr-stop jr-stop--${stop.tone} reveal-child`} style={{ ['--i' as string]: i + 1 } as CSSProperties}>
                <span className="jr-node" aria-hidden="true">
                  <Glyph id={stop.glyph} />
                </span>
                <div className="jr-card">
                  <span className="jr-step">Stop {m.step}</span>
                  <h3 className="jr-event">{m.event}</h3>
                  <p className="jr-result">{m.result}</p>
                  <p className="jr-text">{m.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
