import { useState } from 'react'
import './Challenge.css'
import { useReveal } from '@/hooks/useReveal'
import { challengeQuestions, type Verdict } from '@/lib/landing'
import { Shrodi } from '@/components/art/Shrodi'
import { Obj } from '@/components/art/Art'
import type { Mood } from '@/art/shrodi/shrodi-art'

const questions = challengeQuestions

type Phase = 'answering' | 'revealed'

const OPTIONS: { value: Verdict; label: string; art: string }[] = [
  { value: 'myth', label: 'Myth', art: 'rock' },
  { value: 'fact', label: 'Fact', art: 'diamond' },
]

/** The Myth Smashers card, built like a lesson question: options that pop, a shake when wrong, a feedback sheet. */
export function Challenge() {
  const sectionRef = useReveal<HTMLElement>(0.12)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [picked, setPicked] = useState<Verdict | null>(null)

  const question = questions[index]!
  const revealed = phase === 'revealed'
  const isCorrect = picked === question.answer

  const mood: Mood = !revealed ? 'think' : isCorrect ? 'cheer' : 'oops'
  const speech = !revealed ? 'Hmm… myth or fact? You decide!' : isCorrect ? 'You smashed it! That’s the science.' : 'Not quite. Check the science below!'

  function answer(choice: Verdict) {
    if (revealed) return
    setPicked(choice)
    setPhase('revealed')
  }

  function next() {
    setIndex((value) => (value + 1) % questions.length)
    setPhase('answering')
    setPicked(null)
  }

  function retry() {
    setPhase('answering')
    setPicked(null)
  }

  const progress = ((index + (revealed && isCorrect ? 1 : 0)) / questions.length) * 100

  return (
    <section ref={sectionRef} className="challenge section reveal" id="myth-smashers" aria-label="Challenge what you know">
      <div className="section-inner">
        <div className="section-head reveal-child">
          <h2 className="section-title">Think You Know Nuclear Science?</h2>
          <p className="section-sub">
            Put your knowledge to the test and separate fact from fiction. Myth Smashers turns common nuclear science
            misconceptions into quick, interactive challenges.
          </p>
        </div>

        <div className="challenge-grid">
          <div className="challenge-mascot reveal-child" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
            <p className="challenge-speech" role="status" aria-live="polite" key={speech}>
              {speech}
            </p>
            <Shrodi mood={mood} className="challenge-mascot__art" label="Shrodi, the AtomIQ fox" stillAt={900} />
          </div>

          <article className="challenge-card reveal-child" style={{ ['--i' as string]: 2 } as React.CSSProperties} aria-live="polite">
            <div className="lc-top">
              <span className="lc-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progress">
                <i style={{ width: `${Math.max(progress, 6)}%` }} />
              </span>
              <span className="lc-count">
                {index + 1}/{questions.length}
              </span>
            </div>

            <p className="lc-title">
              <span className="lc-title__tile">
                <Obj id="radiation" />
              </span>
              Myth or fact?
            </p>

            <blockquote className="lc-statement">{question.statement}</blockquote>

            <div className="lc-opts">
              {OPTIONS.map((opt) => {
                const state = !revealed ? '' : opt.value === question.answer ? ' is-right' : picked === opt.value ? ' is-wrong' : ' is-dim'
                const chosen = picked === opt.value
                return (
                  <button
                    key={`${index}-${opt.value}-${chosen && revealed ? 'p' : ''}`}
                    type="button"
                    className={`lc-opt${state}${chosen && revealed ? ' is-picked' : ''}`}
                    disabled={revealed}
                    onClick={() => answer(opt.value)}
                  >
                    <span className="lc-opt__pic">
                      <Obj id={opt.art} />
                    </span>
                    <span className="lc-opt__label">{opt.label}</span>
                    <svg className="lc-opt__mark" viewBox="0 0 24 24" aria-hidden="true">
                      {state === ' is-wrong' ? (
                        <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
                      ) : (
                        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      )}
                    </svg>
                  </button>
                )
              })}
            </div>

            {/* The feedback sheet lives in a slot as tall as the tallest one, so the card never changes size. */}
            <div className="lc-slot">
              <div className="lc-slot__sizer" aria-hidden="true">
                {questions.map((q) => (
                  <div key={q.statement} className="lc-sheet lc-sheet--ghost">
                    <p className="lc-sheet__head">Not quite. It&rsquo;s actually a myth.</p>
                    <p className="lc-sheet__text">{q.explanation}</p>
                    <div className="lc-sheet__actions">
                      <span className="btn lc-sheet__next">Continue</span>
                    </div>
                  </div>
                ))}
              </div>

              {!revealed && (
                <div className="lc-slot__idle">
                  <span className="btn lc-sheet__next lc-sheet__next--off" aria-hidden="true">
                    Continue
                  </span>
                </div>
              )}

              {revealed && (
                <div className={`lc-sheet lc-sheet--live ${isCorrect ? 'lc-sheet--right' : 'lc-sheet--wrong'}`}>
                  <p className="lc-sheet__head">
                    {isCorrect
                      ? question.answer === 'myth'
                        ? 'Correct. It\u2019s a myth!'
                        : 'Correct. It\u2019s a fact!'
                      : question.answer === 'myth'
                        ? 'Not quite. It\u2019s actually a myth.'
                        : 'Not quite. It\u2019s actually a fact.'}
                  </p>
                  <p className="lc-sheet__text">{question.explanation.replace(/^(Myth|Fact)\.\s*/, '')}</p>
                  <div className="lc-sheet__actions">
                    {!isCorrect && (
                      <button type="button" className="lc-sheet__retry" onClick={retry}>
                        Try again
                      </button>
                    )}
                    <button type="button" className={`btn ${isCorrect ? 'btn--green' : 'btn--red'} lc-sheet__next`} onClick={next}>
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
