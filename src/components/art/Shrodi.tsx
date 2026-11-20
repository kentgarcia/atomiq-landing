import { useEffect, useId, useMemo, useRef } from 'react'
import {
  POSES,
  SHRODI_LOOP_MS,
  SHRODI_VIEWBOX,
  buildShrodi,
  frameOf,
  toSvg,
  type Mood,
  type Pose,
} from '@/art/shrodi/shrodi-art'

type ShrodiProps = {
  mood?: Mood
  className?: string
  label?: string
  /** Frame to show on the server and with reduced motion (ms into the idle loop). */
  stillAt?: number
}

const VB = SHRODI_VIEWBOX
const KEYS = Object.keys(POSES.idle) as (keyof Pose)[]
const FRAME_MS = 1000 / 30
/** How fast one mood melts into the next: a time constant, in ms. */
const BLEND_MS = 120

/**
 * The app's Shrodi, drawn from the same data and the same motion maths (blink, glance, breathing, ear and tail
 * sway), so the mascot on the page behaves like the one in the app. Pauses off screen and with reduced motion.
 */
export function Shrodi({ mood = 'idle', className, label = 'Shrodi, the AtomIQ fox', stillAt = 1500 }: ShrodiProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const tree = useMemo(() => buildShrodi(`s${uid}`), [uid])
  const groupRef = useRef<SVGGElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const moodRef = useRef<Mood>(mood)
  moodRef.current = mood
  const initial = useMemo(() => toSvg(tree, frameOf(POSES[mood], stillAt)), [tree, mood, stillAt])

  useEffect(() => {
    const group = groupRef.current
    const svg = svgRef.current
    if (!group || !svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const current: Pose = { ...POSES[moodRef.current] }
    const draw = (t: number) => {
      group.innerHTML = toSvg(tree, frameOf(current, t))
    }
    if (reduce) return // one still frame per mood, drawn by the effect below
    let raf = 0
    let visible = true
    let last = performance.now()
    let drawn = 0
    const start = last
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || now - drawn < FRAME_MS) return
      const dt = now - last
      last = now
      drawn = now
      const target = POSES[moodRef.current]
      const k = 1 - Math.exp(-dt / BLEND_MS)
      for (const key of KEYS) current[key] += (target[key] - current[key]) * k
      draw((now - start) % SHRODI_LOOP_MS)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting
        last = performance.now()
      },
      { rootMargin: '120px' },
    )
    io.observe(svg)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [tree, stillAt])

  // With reduced motion there is no loop: redraw the still frame when the mood changes.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const group = groupRef.current
    if (group) group.innerHTML = toSvg(tree, frameOf(POSES[mood], stillAt))
  }, [tree, mood, stillAt])

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      role="img"
      aria-label={label}
      focusable="false"
    >
      <g ref={groupRef} dangerouslySetInnerHTML={{ __html: initial }} />
    </svg>
  )
}
