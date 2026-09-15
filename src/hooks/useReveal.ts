import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` to the element the first time it scrolls into view.
 * CSS handles the actual reveal / stagger via `.is-visible` selectors.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
