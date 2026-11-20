import { useRef, useState } from 'react'
import './PressButton.css'

type PressButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  ariaLabel?: string
  className?: string
}

type Pop = { id: number; left: number; drift: number; rise: number; rot: number; scale: number; dur: number }

const random = (min: number, max: number) => min + Math.random() * (max - min)

/** The brand button (yellow face on a lip). Every press throws a few "+1" coins, the counter's excitement. */
export function PressButton({ children, onClick, ariaLabel, className = '' }: PressButtonProps) {
  const [pops, setPops] = useState<Pop[]>([])
  const idRef = useRef(0)

  const spawn = (originLeft: number) => {
    const id = ++idRef.current
    const pop: Pop = {
      id,
      left: originLeft + random(-10, 10),
      drift: random(-70, 70),
      rise: random(90, 160),
      rot: random(-22, 22),
      scale: random(0.9, 1.5),
      dur: random(0.7, 1.05),
    }
    setPops((prev) => [...prev.slice(-24), pop])
    window.setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== id)), pop.dur * 1000 + 50)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    spawn(rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * 100 : 50)
    onClick?.()
  }

  return (
    <button type="button" className={`btn btn--lg btn--shine press-btn ${className}`} onClick={handleClick} aria-label={ariaLabel}>
      <span className="press-btn__label">{children}</span>
      <span className="press-btn__pops" aria-hidden="true">
        {pops.map((pop) => (
          <span
            key={pop.id}
            className="press-pop"
            style={{
              left: `${pop.left}%`,
              ['--drift' as string]: `${pop.drift}px`,
              ['--rise' as string]: `${pop.rise}px`,
              ['--rot' as string]: `${pop.rot}deg`,
              ['--pscale' as string]: `${pop.scale}`,
              ['--dur' as string]: `${pop.dur}s`,
            }}
          >
            +1
          </span>
        ))}
      </span>
    </button>
  )
}
