import { useState } from 'react'
import './Challenge.css'
import { challengeQuestions, type Verdict } from '@/lib/landing'

const questions = challengeQuestions

type Phase = 'answering' | 'revealed'

export function Challenge() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('answering')
  const [picked, setPicked] = useState<Verdict | null>(null)

  const question = questions[index]
  const isCorrect = picked === question.answer

  const mascotMood = phase === 'answering' ? 'idle' : isCorrect ? 'happy' : 'shocked'
  const mascotSrc =
    phase === 'answering'
      ? '/images/mascot/thinking.png'
      : isCorrect
        ? '/images/mascot/attack.png'
        : '/images/mascot/hurt.png'
  const mascotSpeech =
    phase === 'answering'
      ? 'Hmm\u2026 myth or fact? You decide!'
      : isCorrect
        ? 'You smashed it! That\u2019s the science.'
        : 'Not quite \u2014 check the science below!'

  function answer(choice: Verdict) {
    if (phase === 'revealed') return
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

  return (
    <section className="challenge" id="myth-smashers" aria-label="Challenge what you know">
      <div className="challenge-inner">
        <div className="challenge-head">
          <p className="challenge-eyebrow">Myth Smashers</p>
          <h2 className="challenge-title">Think You Know Nuclear Science?</h2>
          <p className="challenge-sub">
            Put your knowledge to the test and separate fact from fiction. Myth
            Smashers turns common nuclear science misconceptions into quick,
            interactive challenges.
          </p>
        </div>

        <div className="challenge-grid">
          <div className={`challenge-mascot challenge-mascot--${mascotMood}`}>
            <div className="challenge-speech" role="status" aria-live="polite">
              {mascotSpeech}
            </div>
            <img
              key={mascotSrc}
              className="challenge-mascot__img"
              src={mascotSrc}
              alt="Shrodi, the AtomIQ mascot"
              width={320}
              height={290}
              loading="lazy"
            />
            <span className="challenge-mascot__badge">
              {mascotMood === 'happy'
                ? 'Shrodi cheers!'
                : mascotMood === 'shocked'
                  ? 'Shrodi gasps!'
                  : 'Shrodi is watching\u2026'}
            </span>
          </div>

          <article
            className={`challenge-card${phase === 'revealed' ? (isCorrect ? ' challenge-card--correct' : ' challenge-card--wrong') : ''}`}
            aria-live="polite"
          >
            <div className="challenge-card__top">
              <span className="challenge-card__kicker">Myth or fact?</span>
              <span className="challenge-card__progress" aria-label={`Question ${index + 1} of ${questions.length}`}>
                {questions.map((_, dot) => (
                  <span
                    key={dot}
                    className={`challenge-dot${dot === index ? ' challenge-dot--active' : ''}${dot < index || (phase === 'revealed' && dot === index) ? '' : ''}`}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </div>

            <blockquote className="challenge-card__statement">{question.statement}</blockquote>

            {phase === 'answering' ? (
              <div className="challenge-card__actions">
                <button
                  type="button"
                  className="challenge-btn challenge-btn--myth"
                  onClick={() => answer('myth')}
                >
                  Myth
                </button>
                <button
                  type="button"
                  className="challenge-btn challenge-btn--fact"
                  onClick={() => answer('fact')}
                >
                  Fact
                </button>
              </div>
            ) : (
              <div className="challenge-reveal">
                <p className={`challenge-verdict${isCorrect ? ' challenge-verdict--correct' : ' challenge-verdict--wrong'}`}>
                  {isCorrect
                    ? question.answer === 'myth'
                      ? 'Correct \u2014 it\u2019s a myth!'
                      : 'Correct \u2014 it\u2019s a fact!'
                    : question.answer === 'myth'
                      ? 'Not quite \u2014 it\u2019s actually a myth.'
                      : 'Not quite \u2014 it\u2019s actually a fact.'}
                </p>
                <p className="challenge-explain">{question.explanation}</p>
                <div className="challenge-card__actions">
                  <button type="button" className="challenge-btn challenge-btn--ghost" onClick={retry}>
                    Try again
                  </button>
                  <button type="button" className="challenge-btn challenge-btn--next" onClick={next}>
                    Next myth
                  </button>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
