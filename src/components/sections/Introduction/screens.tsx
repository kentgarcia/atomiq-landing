import type { CSSProperties } from 'react'
import { AppIcon, Avatar, Glyph, Obj, Teacher } from '@/components/art/Art'

/* Four app screens, drawn in HTML from the app's real tokens and art, at a fixed 280 x 588 design size. */

const TAB_ICONS: Record<string, string> = {
  home: 'M12 3 3 10.5V21h6.5v-6h5v6H21V10.5z',
  quests: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.6 14.4-3.8-3.8 1.7-1.7 2.1 2.1 5.1-5.1 1.7 1.7z',
  feed: 'M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm4 17.2a1.2 1.2 0 1 0 0 .01z',
  games: 'M7 7h10a5 5 0 0 1 4.9 6l-.8 4a3 3 0 0 1-5.2 1.2L14.5 16h-5l-1.4 2.2A3 3 0 0 1 2.9 17l-.8-4A5 5 0 0 1 7 7Zm0 3v1.5H5.5V13H7v1.5h1.5V13H10v-1.5H8.5V10Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  profile: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6Z',
}

function TabBar({ active }: { active: keyof typeof TAB_ICONS }) {
  return (
    <div className="sc-tabs" aria-hidden="true">
      {Object.entries(TAB_ICONS).map(([id, d]) => (
        <span key={id} className={`sc-tab${id === active ? ' sc-tab--on' : ''}`}>
          <svg viewBox="0 0 24 24">
            <path d={d} />
          </svg>
        </span>
      ))}
    </div>
  )
}

function StatusBar() {
  return (
    <div className="sc-status" aria-hidden="true">
      <span>9:41</span>
      <span className="sc-status__dots">
        <i />
        <i />
        <i />
      </span>
    </div>
  )
}

function Pills() {
  return (
    <div className="sc-pills" aria-hidden="true">
      <span className="sc-pill sc-pill--xp">
        <Obj id="bolt" /> 120
      </span>
      <span className="sc-pill sc-pill--gem">
        <Obj id="diamond" /> 35
      </span>
    </div>
  )
}

/* ---------- 1. the learning map ---------- */
const NODES = [
  { glyph: 'atom', x: 50, state: 'done' },
  { glyph: 'nucleus', x: 72, state: 'done' },
  { glyph: 'book', x: 50, state: 'current' },
  { glyph: 'star', x: 28, state: 'locked' },
  { glyph: 'trophy', x: 50, state: 'locked' },
] as const

export function MapScreen() {
  return (
    <div className="sc sc-map">
      <StatusBar />
      <Pills />
      <div className="sc-unit">
        <div>
          <p className="sc-unit__kicker">Unit 1</p>
          <p className="sc-unit__title">Inside the Atom</p>
        </div>
        <span className="sc-unit__btn">
          <Glyph id="book" />
        </span>
      </div>
      <div className="sc-path">
        {NODES.map((n, i) => (
          <div key={i} className={`sc-node sc-node--${n.state}`} style={{ left: `${n.x}%`, top: `${i * 66 + 4}px` } as CSSProperties}>
            {n.state === 'current' && (
              <>
                <svg className="sc-ring" viewBox="0 0 80 80" aria-hidden="true">
                  <circle cx="40" cy="40" r="37" className="sc-ring__bg" />
                  <circle cx="40" cy="40" r="37" className="sc-ring__fg" pathLength="100" />
                </svg>
                <span className="sc-bubble">
                  <b>Meet the atom</b>
                  <em>Start +20 XP</em>
                </span>
              </>
            )}
            <span className="sc-node__face">
              {n.state === 'done' ? (
                <svg viewBox="0 0 24 24" className="sc-check">
                  <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <Glyph id={n.glyph} />
              )}
            </span>
          </div>
        ))}
        <i className="sc-fly" style={{ left: '40%', top: '150px', ['--d' as string]: '0s' } as CSSProperties} />
        <i className="sc-fly" style={{ left: '62%', top: '196px', ['--d' as string]: '-1.7s' } as CSSProperties} />
        <i className="sc-fly" style={{ left: '52%', top: '150px', ['--d' as string]: '-3.1s' } as CSSProperties} />
      </div>
      <TabBar active="home" />
    </div>
  )
}

/* ---------- 2. a lesson question ---------- */
export function LessonScreen() {
  return (
    <div className="sc sc-lesson">
      <StatusBar />
      <div className="sc-top">
        <span className="sc-x" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        <span className="sc-bar">
          <i />
        </span>
      </div>
      <div className="sc-title">
        <span className="sc-title__tile">
          <Obj id="atom" />
        </span>
        <span>Pick one</span>
      </div>
      <div className="sc-teach">
        <Teacher id="npc-ada" form="bust" className="sc-teach__fig" />
        <p className="sc-teach__bubble">What sits at the very centre of an atom?</p>
      </div>
      <div className="sc-opts">
        <p className="sc-opt sc-opt--right">
          <span>The nucleus</span>
          <svg className="sc-opt__mark" viewBox="0 0 24 24">
            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
        <p className="sc-opt">
          <span>An electron</span>
        </p>
        <p className="sc-opt">
          <span>A molecule</span>
        </p>
      </div>
      <div className="sc-sheet">
        <p className="sc-sheet__head">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="currentColor" />
            <path d="m6.8 12.6 3.4 3.4 7-7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Nice!
        </p>
        <p className="sc-sheet__text">The nucleus holds the protons and neutrons.</p>
        <span className="sc-sheet__btn">Continue</span>
      </div>
    </div>
  )
}

/* ---------- 3. the feed ---------- */
export function FeedScreen() {
  return (
    <div className="sc sc-feed">
      <StatusBar />
      <div className="sc-head">
        <h4>Feed</h4>
      </div>
      <div className="sc-circles" aria-hidden="true">
        {[
          ['atom', '#ddf4ff', 'Dex'],
          ['sun', '#feefc8', 'Table'],
          ['balloon', '#ffe3e3', 'Facts'],
          ['water', '#e5f8d0', 'Lab'],
        ].map(([id, bg, label]) => (
          <span key={label} className="sc-circle">
            <i style={{ background: bg }}>
              <Obj id={id!} />
            </i>
            {label}
          </span>
        ))}
      </div>
      <article className="sc-post">
        <header>
          <span className="sc-post__avatar" style={{ background: '#DDF4FF' }}>
            <Teacher id="npc-ada" form="head" />
          </span>
          <span>
            <b>Ada</b>
            <em>Atom teacher</em>
          </span>
        </header>
        <p className="sc-post__bubble">You finished Inside the Atom. Protons, neutrons and electrons, all yours now!</p>
        <footer>
          <span className="sc-react">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z" />
            </svg>
            Love
          </span>
          <em>Liked by Hal and 2 others</em>
        </footer>
      </article>
      <article className="sc-post sc-post--2">
        <header>
          <span className="sc-post__avatar" style={{ background: '#FEEFC8' }}>
            <Teacher id="npc-hal" form="head" />
          </span>
          <span>
            <b>Hal</b>
            <em>Radioactivity teacher</em>
          </span>
        </header>
        <p className="sc-post__bubble">Some atoms change on their own. Ready for Unit 2?</p>
      </article>
      <article className="sc-blog" aria-hidden="true">
        <span className="sc-blog__cover">
          <Obj id="banana" />
        </span>
        <span>
          <em>Blog</em>
          <b>Why is a banana a little radioactive?</b>
        </span>
      </article>
      <TabBar active="feed" />
    </div>
  )
}

/* ---------- 4. the phone ---------- */
const PHONE_GRID: [string, string][] = [
  ['chats', 'Chats'],
  ['contacts', 'Contacts'],
  ['atomdex', 'AtomDex'],
  ['daily-fact', 'Daily Fact'],
  ['shop', 'Shop'],
  ['field-notes', 'Field Notes'],
  ['scanner', 'Atom Scanner'],
  ['library', 'Library'],
  ['camera', 'Camera'],
  ['safety', 'Safety Guide'],
  ['map', 'Nuclear Map'],
  ['settings', 'Settings'],
]

export function PhoneScreen() {
  return (
    <div className="sc sc-phone">
      <StatusBar />
      <div className="sc-wall" aria-hidden="true" />
      <div className="sc-me">
        <Avatar id="bun" className="sc-me__face" />
        <span>
          <b>Your phone</b>
          <em>12 apps</em>
        </span>
      </div>
      <div className="sc-apps">
        {PHONE_GRID.map(([id, name], i) => (
          <span key={id} className="sc-app" style={{ ['--i' as string]: i } as CSSProperties}>
            <AppIcon id={id} />
            <em>{name}</em>
            {id === 'chats' && <b className="sc-badge">1</b>}
          </span>
        ))}
      </div>
      <div className="sc-widget" aria-hidden="true">
        <span className="sc-widget__icon">
          <Obj id="banana" />
        </span>
        <span>
          <em>Daily Fact</em>
          <b>Bananas are slightly radioactive, and totally safe to eat.</b>
        </span>
      </div>
      <TabBar active="phone" />
    </div>
  )
}
