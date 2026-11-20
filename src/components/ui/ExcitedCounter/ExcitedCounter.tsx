import './ExcitedCounter.css'

type Props = { count: number; ready: boolean; className?: string }

/** The live "excited clicks" pill: a white 3D chip with the number in a soft yellow well. */
export function ExcitedCounter({ count, ready, className = '' }: Props) {
  return (
    <div className={`counter card3d ${className}`} role="status" aria-live="polite" aria-busy={!ready}>
      {ready ? (
        <>
          <span key={count} className="counter__count">
            {count.toLocaleString()}
          </span>
          <span className="counter__text">{count === 1 ? 'excited click' : 'excited clicks'} and counting</span>
        </>
      ) : (
        <>
          <span className="counter__skeleton" aria-hidden="true" />
          <span className="counter__text counter__text--loading">counting excitement…</span>
        </>
      )}
    </div>
  )
}
