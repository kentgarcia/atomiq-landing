import { useEffect, useState } from 'react'

const STORAGE_KEY = 'atomiq:excited-total'

/** Where the counter starts: a random number between 700,000 and 950,000. */
export const COUNT_MIN = 700_000
export const COUNT_MAX = 950_000
export const randomStartCount = () => COUNT_MIN + Math.floor(Math.random() * (COUNT_MAX - COUNT_MIN + 1))

/**
 * Shared excited-click counter (no backend). It starts at `initialCount` (generated once by the route loader, so server
 * and client render the same number) and every click adds one. A returning visitor keeps their own running total in
 * localStorage, so the number never goes back down on refresh. Hero and final call-to-action read this one value.
 */
export function useExcitedCounter(initialCount: number) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY))
      if (Number.isFinite(saved) && saved >= COUNT_MIN) setCount(saved)
      else localStorage.setItem(STORAGE_KEY, String(initialCount))
    } catch {
      /* storage unavailable: keep the loader value */
    }
  }, [initialCount])

  function handleExcited() {
    setCount((c) => {
      const next = c + 1
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return { displayedCount: count, isCountReady: true, handleExcited }
}
