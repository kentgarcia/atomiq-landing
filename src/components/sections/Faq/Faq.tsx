import { useState, type CSSProperties } from 'react'
import './Faq.css'
import { useReveal } from '@/hooks/useReveal'
import { faqs } from '@/lib/landing'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const sectionRef = useReveal<HTMLElement>(0.1)

  return (
    <section ref={sectionRef} className="faq reveal" id="faq" aria-label="Frequently asked questions">
      <div className="faq-inner">
        <div className="faq-head reveal-child">
          <p className="faq-eyebrow">FAQs</p>
          <h2 className="faq-title">Questions? Answers.</h2>
          <p className="faq-sub">
            Everything you might want to know about AtomIQ, Shrodi, and the science behind it.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div
                key={item.question}
                className={`faq-item reveal-child${isOpen ? ' faq-item--open' : ''}`}
                style={{ '--i': index } as CSSProperties}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className="faq-a-wrap"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                >
                  <div className="faq-a">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
