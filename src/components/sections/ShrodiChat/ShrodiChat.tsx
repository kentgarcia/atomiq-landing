import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './ShrodiChat.css'
import { useReveal } from '@/hooks/useReveal'
import { Shrodi } from '@/components/art/Shrodi'
import { Sparkle } from '@/components/art/Art'
import { shrodiSamples } from '@/lib/landing'
import type { Mood } from '@/art/shrodi/shrodi-art'

type Msg = { id: number; from: 'shrodi' | 'you'; text: string; sources?: string[] }

const GREETING: Msg[] = [
  { id: 1, from: 'shrodi', text: 'Hi, I’m Shrodi!' },
  { id: 2, from: 'shrodi', text: 'Tap a question and I’ll tell you what the science says.' },
]

const TYPING_MS = 900

/** A tiny taste of the in-app Chats: you tap a reply (there is no text box), Shrodi types, then answers with sources. */
export function ShrodiChat() {
  const sectionRef = useReveal<HTMLElement>(0.12)
  const [log, setLog] = useState<Msg[]>(GREETING)
  const [asked, setAsked] = useState<number[]>([])
  const [typing, setTyping] = useState(false)
  const [mood, setMood] = useState<Mood>('wave')
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const timers = useRef<number[]>([])
  const nextId = useRef(10)

  useEffect(() => {
    const id = window.setTimeout(() => setMood('idle'), 2600)
    const all = timers.current
    return () => {
      window.clearTimeout(id)
      all.forEach(window.clearTimeout)
    }
  }, [])

  // keep the newest line in view, inside the chat only (never scrolls the page)
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [log, typing])

  const remaining = shrodiSamples.map((s, i) => ({ s, i })).filter(({ i }) => !asked.includes(i))
  const done = remaining.length === 0 && !typing

  function ask(i: number) {
    if (typing) return
    const sample = shrodiSamples[i]!
    setAsked((a) => [...a, i])
    setLog((l) => [...l, { id: nextId.current++, from: 'you', text: sample.question }])
    setTyping(true)
    setMood('think')
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false)
        setMood('happy')
        setLog((l) => [...l, { id: nextId.current++, from: 'shrodi', text: sample.answer, sources: sample.sources }])
        timers.current.push(window.setTimeout(() => setMood('smile'), 1800))
      }, TYPING_MS),
    )
  }

  function replay() {
    timers.current.forEach(window.clearTimeout)
    setLog(GREETING)
    setAsked([])
    setTyping(false)
    setMood('wave')
    timers.current.push(window.setTimeout(() => setMood('idle'), 2000))
  }

  return (
    <section ref={sectionRef} className="chat section reveal" id="shrodi" aria-label="Meet Shrodi">
      <div className="section-inner chat-grid">
        <div className="chat-copy reveal-child">
          <div className="chat-figure">
            <Shrodi mood={mood} className="chat-shrodi" label="Shrodi, the AtomIQ fox" stillAt={900} />
            <Sparkle x="8%" y="20%" size={20} color="#fff" delay={0.3} />
            <Sparkle x="86%" y="34%" size={16} color="#FABF24" delay={1.2} />
          </div>
          <h2 className="section-title chat-title">Your Learning Companion, One Tap Away.</h2>
          <p className="chat-sub">
            Shrodi keeps you company across the app, and chats with you on your in-app phone. Answers are written from
            curated sources, never made up on the spot.
          </p>
        </div>

        <div className="chat-phone reveal-child" style={{ ['--i' as string]: 2 } as CSSProperties}>
          <header className="chat-bar">
            <span className="chat-bar__face">
              <img src="/icon-128.png" alt="" width={44} height={44} />
            </span>
            <span className="chat-bar__who">
              <b>Shrodi</b>
              <em className={typing ? 'is-typing' : ''}>{typing ? 'typing…' : 'AtomIQ guide'}</em>
            </span>
          </header>

          <div className="chat-body" ref={bodyRef} role="log" aria-live="polite" aria-label="Chat with Shrodi">
            <p className="chat-day">Today</p>
            {log.map((m, idx) => {
              const prev = log[idx - 1]
              const next = log[idx + 1]
              const first = prev?.from !== m.from
              const last = next?.from !== m.from
              return (
                <div key={m.id} className={`chat-row chat-row--${m.from}${first ? ' is-first' : ''}${last ? ' is-last' : ''}`}>
                  {m.from === 'shrodi' && (
                    <span className={`chat-mini${last ? '' : ' chat-mini--hidden'}`} aria-hidden="true">
                      <img src="/icon-128.png" alt="" width={30} height={30} />
                    </span>
                  )}
                  <div className={`chat-bubble chat-bubble--${m.from}`}>
                    <p>{m.text}</p>
                    {m.sources && (
                      <div className="chat-sources">
                        <span className="chat-sources__label">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A1.5 1.5 0 0 0 5 20.5V4.5Zm0 16A2.5 2.5 0 0 0 6.5 23H20v-2H6.5A.5.5 0 0 1 6 20.5Z" />
                          </svg>
                          Sources
                        </span>
                        <ul aria-label="Sources">
                          {m.sources.map((src) => (
                            <li key={src}>{src}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {typing && (
              <div className="chat-row chat-row--shrodi is-first is-last">
                <span className="chat-mini" aria-hidden="true">
                  <img src="/icon-128.png" alt="" width={30} height={30} />
                </span>
                <div className="chat-bubble chat-bubble--shrodi chat-typing" aria-label="Shrodi is typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>

          <footer className="chat-replies">
            {done ? (
              <div className="chat-end">
                <p>No more replies.</p>
                <button type="button" className="btn btn--blue chat-replay" onClick={replay}>
                  Replay
                </button>
              </div>
            ) : (
              <>
                <p className="chat-replies__hint">Tap a reply</p>
                <div className="chat-replies__list">
                  {remaining.map(({ s: sample, i }) => (
                    <button key={sample.question} type="button" className="chat-pill" disabled={typing} onClick={() => ask(i)}>
                      {sample.question}
                    </button>
                  ))}
                </div>
              </>
            )}
          </footer>
        </div>
      </div>
    </section>
  )
}
