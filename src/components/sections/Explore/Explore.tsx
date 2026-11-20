import { useState, type CSSProperties } from 'react'
import './Explore.css'
import { useReveal } from '@/hooks/useReveal'
import { AppIcon, Avatar, Obj, Teacher } from '@/components/art/Art'
import { TEACHERS } from '@/art/generated'

const delay = (i: number) => ({ ['--i' as string]: i }) as CSSProperties

/** A pill that pops when you press it, like an option in a lesson. */
function PopChip({ children, tone }: { children: React.ReactNode; tone: 'red' | 'green' | 'blue' }) {
  const [n, setN] = useState(0)
  return (
    <button type="button" key={n} className={`xp-chip xp-chip--${tone}${n ? ' is-popped' : ''}`} onClick={() => setN((v) => v + 1)}>
      {children}
    </button>
  )
}

export function Explore() {
  const sectionRef = useReveal<HTMLElement>(0.08)

  return (
    <section ref={sectionRef} className="explore section section--soft reveal" id="features" aria-label="Explore nuclear science">
      <div className="section-inner">
        <div className="section-head reveal-child">
          <h2 className="section-title">
            Learn It. <span className="chip-word">Play It.</span> Discover It.
          </h2>
          <p className="section-sub">Step inside the AtomIQ universe: everything you can do, in one friendly place.</p>
        </div>

        <div className="xp-grid">
          {/* Lessons */}
          <article className="xp-card xp-card--lessons reveal-child" style={delay(1)}>
            <div className="xp-stage xp-stage--yellow">
              <ul className="xp-teachers" aria-label="The seven teachers">
                {TEACHERS.map((t, i) => (
                  <li key={t.id} style={{ ['--k' as string]: i, ['--c' as string]: t.color } as CSSProperties}>
                    <span className="xp-teacher">
                      <Teacher id={t.id} form="head" />
                    </span>
                    <em>{t.name}</em>
                  </li>
                ))}
              </ul>
            </div>
            <div className="xp-body">
              <h3>Interactive Lessons</h3>
              <p>Break nuclear science down into short, easy-to-follow units. Every field has its own teacher to learn from.</p>
            </div>
          </article>

          {/* Myth Smashers */}
          <article className="xp-card xp-card--myth reveal-child" style={delay(2)}>
            <div className="xp-stage xp-stage--red">
              <div className="xp-myth">
                <Obj id="radiation" className="xp-myth__obj" />
                <div className="xp-myth__row">
                  <PopChip tone="red">Myth</PopChip>
                  <PopChip tone="green">Fact</PopChip>
                </div>
              </div>
            </div>
            <div className="xp-body">
              <h3>Myth Smashers</h3>
              <p>Challenge common misconceptions and find out what the science really says.</p>
            </div>
          </article>

          {/* Atom Maze */}
          <article className="xp-card xp-card--maze reveal-child" style={delay(3)}>
            <div className="xp-stage xp-stage--sky xp-maze" aria-hidden="true">
              <img className="xp-maze__coin xp-maze__coin--1" src="/images/maze/coin_gold.png" alt="" loading="lazy" />
              <img className="xp-maze__coin xp-maze__coin--2" src="/images/maze/coin_gold.png" alt="" loading="lazy" />
              <img className="xp-maze__gem" src="/images/maze/gem_blue.png" alt="" loading="lazy" />
              <img className="xp-maze__flag" src="/images/maze/flag_yellow_a.png" alt="" loading="lazy" />
              <img className="xp-maze__bug" src="/images/maze/ladybug_walk_a.png" alt="" loading="lazy" />
              <span className="xp-maze__hero" />
              <div className="xp-maze__ground">
                {Array.from({ length: 9 }, (_, i) => (
                  <img key={i} src="/images/maze/terrain_grass_block_top.png" alt="" loading="lazy" />
                ))}
              </div>
            </div>
            <div className="xp-body">
              <h3>Atom Maze</h3>
              <p>Run, jump and battle through levels, answering questions to beat what stands in your way.</p>
            </div>
          </article>

          {/* AtomDex */}
          <article className="xp-card xp-card--dex reveal-child" style={delay(4)}>
            <div className="xp-stage xp-stage--purple">
              <AppIcon id="atomdex" className="xp-dex__icon" />
              <ul className="xp-dex__chips" aria-hidden="true">
                <li>Isotope</li>
                <li>Half-life</li>
                <li>Fission</li>
              </ul>
            </div>
            <div className="xp-body">
              <h3>AtomDex</h3>
              <p>Look up concepts and terms, with the sources behind every entry. Clip a line to your Field Notes.</p>
            </div>
          </article>

          {/* Avatar + shop */}
          <article className="xp-card xp-card--shop reveal-child" style={delay(5)}>
            <div className="xp-stage xp-stage--pink">
              <div className="xp-avatars">
                <Avatar id="classic" className="xp-avatar xp-avatar--1" />
                <Avatar id="bun" className="xp-avatar xp-avatar--2" />
              </div>
              <span className="xp-price">
                <Obj id="diamond" /> 40
              </span>
            </div>
            <div className="xp-body">
              <h3>Make It Yours</h3>
              <p>Earn diamonds from quests and spend them on hair, clothes, paints and patterns for your own avatar.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
