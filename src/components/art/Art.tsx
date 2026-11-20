import type { CSSProperties } from 'react'
import { HERO_OBJECTS } from '@/art/hero-objects'
import { APP_ICONS, AVATARS, GLYPHS, GLYPH_VIEWBOX, OBJECTS, TEACHERS } from '@/art/generated'

type Common = { className?: string; style?: CSSProperties }

/** A teacher's drawing (the app's own): `bust` is the lesson crop, `head` the chip crop, `hero` the standing figure. */
export function Teacher({ id, form = 'bust', className, style }: Common & { id: string; form?: 'bust' | 'head' | 'hero' }) {
  const t = TEACHERS.find((x) => x.id === id)
  if (!t) return null
  const fig = t[form]
  return (
    <svg
      className={className}
      style={style}
      viewBox={fig.viewBox}
      role="img"
      aria-label={`${t.name}, ${t.title.toLowerCase()}`}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: fig.svg }}
    />
  )
}

/** One of the lesson object pictures (100-unit frame). */
export function Obj({ id, className, style, decorative = true }: Common & { id: string; decorative?: boolean }) {
  const o = OBJECTS[id] ?? HERO_OBJECTS[id]
  if (!o) return null
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : o.name}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: o.svg }}
    />
  )
}

/** A phone app tile: face, lip and the flat picture, the way the Phone tab draws it. */
export function AppIcon({ id, className, style }: Common & { id: string }) {
  const a = APP_ICONS[id]
  if (!a) return null
  const clip = `appclip-${id}`
  return (
    <svg className={className} style={style} viewBox="0 0 100 106" role="img" aria-label={a.name} focusable="false">
      <clipPath id={clip}>
        <rect width="100" height="100" rx="27" />
      </clipPath>
      <rect y="5" width="100" height="100" rx="27" fill={a.lip} />
      <rect width="100" height="100" rx="27" fill={a.face} />
      <g clipPath={`url(#${clip})`} dangerouslySetInnerHTML={{ __html: a.svg }} />
    </svg>
  )
}

/** A white lesson-map glyph (placed on a coloured face by the caller). */
export function Glyph({ id, className, style }: Common & { id: string }) {
  const g = GLYPHS[id]
  if (!g) return null
  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${GLYPH_VIEWBOX} ${GLYPH_VIEWBOX}`}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: g }}
    />
  )
}

/** A starter avatar on its paint, as a rounded square. */
export function Avatar({ id, paint, className, style }: Common & { id: string; paint?: string }) {
  const a = AVATARS.find((x) => x.id === id)
  if (!a) return null
  return (
    <div className={className} style={{ background: paint ?? a.background, ...style }}>
      <svg viewBox={a.viewBox} role="img" aria-label={a.label} focusable="false" style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: a.svg }} />
    </div>
  )
}

/** Four-point sparkle (CSS-drawn; see motion.css). */
export function Sparkle({ x, y, size = 18, color = '#fff', delay = 0, className }: { x: string; y: string; size?: number; color?: string; delay?: number; className?: string }) {
  return (
    <span
      className={`sparkle ${className ?? ''}`}
      aria-hidden="true"
      style={{ left: x, top: y, width: size, height: size, ['--sc' as string]: color, ['--d' as string]: `${delay}s` }}
    />
  )
}

/**
 * An object picture as a cached image (a data URI), for pieces that move all the time. An inline SVG that is
 * transformed can be repainted every frame; an image is rasterised once and then only composited, like the mascot.
 */
export function objectUri(id: string): string | null {
  const o = OBJECTS[id] ?? HERO_OBJECTS[id]
  if (!o) return null
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${o.svg}</svg>`)}`
}
