import { useState } from 'react'
import './Shrodi.css'

import { shrodiSamples } from '@/lib/landing'

const samples = shrodiSamples

const pipeline = [
  {
    step: 'Ask a question',
    text: 'Start with anything curious — from bananas to power plants.',
    icon: '❓',
  },
  {
    step: 'Shrodi finds sources',
    text: 'Every answer traces back to curated, trusted references.',
    icon: '▣',
  },
  {
    step: 'Learn the science',
    text: 'Get a clear, friendly explanation grounded in real research.',
    icon: '⚛',
  },
] as const

export function Shrodi() {
  const [active, setActive] = useState(0)
  const current = samples[active]

  return (
    <section className="shrodi" id="shrodi" aria-label="Meet Shrodi">
      <div className="shrodi-inner">
        <div className="shrodi-head">
          <p className="shrodi-eyebrow">Meet Shrodi</p>
          <h2 className="shrodi-title">Curious About Nuclear Science? Ask Shrodi.</h2>
          <p className="shrodi-sub">
            Your AI-powered nuclear science companion, designed to help you
            explore questions, understand complex concepts, and learn from
            trusted scientific sources.
          </p>
        </div>

        <ol className="shrodi-pipeline" aria-label="How Shrodi answers">
          {pipeline.map((item, index) => (
            <li key={item.step} className="shrodi-pipe">
              <span className="shrodi-pipe__icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <p className="shrodi-pipe__step">
                  <span className="shrodi-pipe__num">{index + 1}</span> {item.step}
                </p>
                <p className="shrodi-pipe__text">{item.text}</p>
              </div>
              {index < pipeline.length - 1 && (
                <span className="shrodi-pipe__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="shrodi-grid">
          <div className="shrodi-mascot">
            <div className="shrodi-mascot__glow" aria-hidden="true" />
            <img
              className="shrodi-mascot__img"
              src="/images/mascot/idea.png"
              alt="Shrodi, the AtomIQ mascot, with a bright idea"
              width={360}
              height={397}
              loading="lazy"
            />
            <p className="shrodi-micro">
              <strong>Ask anything about nuclear science.</strong>
              <span>Get clear, reliable explanations grounded in curated scientific references.</span>
            </p>
            <a className="shrodi-cta" href="#download">
              Meet Shrodi <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="shrodi-chat" aria-label="Sample Shrodi conversation">
            <div className="shrodi-chat__header">
              <span className="shrodi-chat__avatar" aria-hidden="true">
                S
              </span>
              <div>
                <p className="shrodi-chat__name">Shrodi</p>
                <p className="shrodi-chat__status">
                  <span className="shrodi-chat__dot" aria-hidden="true" /> Online · answers with sources
                </p>
              </div>
            </div>

            <div className="shrodi-chat__samples" role="tablist" aria-label="Sample questions">
              {samples.map((sample, index) => (
                <button
                  key={sample.question}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`shrodi-chip${index === active ? ' shrodi-chip--active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  {sample.question}
                </button>
              ))}
            </div>

            <div className="shrodi-chat__body" role="tabpanel" aria-live="polite">
              <div className="shrodi-bubble shrodi-bubble--user">{current.question}</div>
              <div className="shrodi-bubble shrodi-bubble--bot">
                <p>{current.answer}</p>
                <div className="shrodi-sources" aria-label="Sources for this answer">
                  {current.sources.map((source) => (
                    <span key={source} className="shrodi-source">
                      <span className="shrodi-source__icon" aria-hidden="true">
                        ▣
                      </span>
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrodi-chat__input" aria-hidden="true">
              <span>Ask Shrodi anything…</span>
              <span className="shrodi-chat__send">↑</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
