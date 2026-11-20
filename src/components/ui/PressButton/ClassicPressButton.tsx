import { useRef, useState } from 'react'
import './ClassicPressButton.css'

type ClassicPressButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  ariaLabel?: string
}

type Pop = {
  id: number
  left: number
  drift: number
  rise: number
  rot: number
  spin: number
  scale: number
  dur: number
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function ClassicPressButton({ children, onClick, ariaLabel }: ClassicPressButtonProps) {
  const [pops, setPops] = useState<Pop[]>([])
  const idRef = useRef(0)

  const spawn = (originLeft: number) => {
    const id = ++idRef.current
    const pop: Pop = {
      id,
      left: originLeft + random(-14, 14),
      drift: random(-90, 90),
      rise: random(90, 170),
      rot: random(-28, 28),
      spin: random(-40, 40),
      scale: random(0.85, 1.7),
      dur: random(0.7, 1.15),
    }
    setPops((prev) => [...prev.slice(-29), pop])
    window.setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id))
    }, pop.dur * 1000 + 50)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5
    spawn(ratio * 100)
    onClick?.()
  }

  return (
    <button type="button" className="classic-btn" onClick={handleClick} aria-label={ariaLabel}>
      <span className="classic-btn__shadow" aria-hidden="true" />
      <span className="classic-btn__base" aria-hidden="true" />
      <span className="classic-btn__face" aria-hidden="true" />
      <span className="classic-btn__label">{children}</span>
      <span className="classic-btn__pops" aria-hidden="true">
        {pops.map((pop) => (
          <span
            key={pop.id}
            className="classic-pop"
            style={{
              left: `${pop.left}%`,
              ['--drift' as string]: `${pop.drift}px`,
              ['--rise' as string]: `${pop.rise}px`,
              ['--rot' as string]: `${pop.rot}deg`,
              ['--spin' as string]: `${pop.spin}deg`,
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
