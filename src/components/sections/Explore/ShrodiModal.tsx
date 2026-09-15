import { useEffect, useState } from 'react'
import './ShrodiModal.css'

import { shrodiSamples } from '@/lib/landing'

type ShrodiModalProps = {
  open: boolean
  onClose: () => void
}

export function ShrodiModal({ open, onClose }: ShrodiModalProps) {
  const [active, setActive] = useState(0)
  const current = shrodiSamples[active] ?? shrodiSamples[0]

  // Reset to the first (hero) sample each time the modal opens.
  useEffect(() => {
    if (open) setActive(0)
  }, [open ])

  // Escape to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="shrodi-modal__overlay" onClick={onClose}>
      <div
        className="shrodi-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shrodi-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="shrodi-modal__close"
          onClick={onClose}
          aria-label="Close Shrodi preview"
          autoFocus
        >
          ✕
        </button>

        <div className="shrodi-modal__hero">
          <img
            className="shrodi-modal__mascot"
            src="/images/mascot/happy_2.png"
            alt="Shrodi, the AtomIQ mascot, waving hello"
            width={120}
            height={132}
          />
          <div className="shrodi-modal__hero-text">
            <p className="shrodi-modal__eyebrow">✨ Shrodi</p>
            <h3 className="shrodi-modal__title" id="shrodi-modal-title">
              Meet Shrodi
            </h3>
            <p className="shrodi-modal__sub">Ask me about nuclear science!</p>
          </div>
        </div>

        <div className="shrodi-modal__chat" aria-live="polite">
          <div className="shrodi-modal__bubble shrodi-modal__bubble--user">
            <span className="shrodi-modal__who">You:</span> {current.question}
          </div>
          <div className="shrodi-modal__bubble shrodi-modal__bubble--bot">
            <span className="shrodi-modal__who">Shrodi:</span> {current.answer}
          </div>
        </div>

        <div className="shrodi-modal__presets" aria-label="Try a sample question">
          {shrodiSamples.map((sample, index) => (
            <button
              key={sample.question}
              type="button"
              className={`shrodi-modal__chip${index === active ? ' shrodi-modal__chip--active' : ''}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              {shortLabel(sample.question)}
            </button>
          ))}
        </div>

        <div className="shrodi-modal__footer">
          <p className="shrodi-modal__more">Want to learn more?</p>
          <a className="shrodi-modal__cta" href="#download" onClick={onClose}>
            Download AtomIQ <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function shortLabel(question: string) {
  const cleaned = question.replace(/[“”"']/g, '').replace(/\?+$/, '')
  return cleaned.length > 34 ? `${cleaned.slice(0, 34)}…` : question
}
