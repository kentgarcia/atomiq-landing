import { useEffect, useRef, useState } from 'react'
import { getExcitedCount, incrementExcitedCount } from '@/lib/engagement.functions'

const PENDING_KEY = 'atomiq:excited-pending'
const FLUSH_DELAY_MS = 2000

/**
 * Shared excited-click counter.
 * `globalCount` is the last server-confirmed value, `localClicks` is the
 * unflushed burst. Display is their sum so the button feels instant while
 * Supabase sees one RPC per burst.
 */
export function useExcitedCounter(initialCount = 0) {
  const [globalCount, setGlobalCount] = useState(initialCount)
  const [localClicks, setLocalClicks] = useState(0)
  const [isCountReady, setIsCountReady] = useState(initialCount > 0)
  const pendingRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flushingRef = useRef(false)

  const displayedCount = globalCount + localClicks

  async function flushClicks() {
    if (flushingRef.current) return
    const amount = pendingRef.current
    if (amount <= 0) return
    flushingRef.current = true
    try {
      const { count } = await incrementExcitedCount({ data: { delta: amount } })
      pendingRef.current = 0
      setLocalClicks(0)
      setGlobalCount(count)
      try {
        localStorage.removeItem(PENDING_KEY)
      } catch {
        /* storage unavailable — ignore */
      }
    } catch {
      // Keep pending for retry — server stays source of truth.
      try {
        localStorage.setItem(PENDING_KEY, String(pendingRef.current))
      } catch {
        /* storage unavailable — ignore */
      }
    } finally {
      flushingRef.current = false
    }
  }

  const flushRef = useRef(flushClicks)
  flushRef.current = flushClicks

  function scheduleFlush() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      void flushRef.current()
    }, FLUSH_DELAY_MS)
  }

  // Restore pending clicks across refresh/close + fetch fresh global
  // count (SSR/prerender bakes a stale loader value) + flush on tab hide.
  useEffect(() => {
    // Fresh global count — deferred past the hero entrance (~1.3s) via
    // idle time so the network + re-render never contends with the
    // entrance animations and cause visible jank.
    const fetchFresh = () => {
      void getExcitedCount()
        .then(({ count }) => {
          setGlobalCount((prev) => Math.max(prev, count))
          setIsCountReady(true)
        })
        .catch(() => {
          /* keep loader value on failure */
          setIsCountReady(true)
        })
    }
    let idleId = 0
    let fallbackId: ReturnType<typeof setTimeout> | null = null
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(fetchFresh, { timeout: 2500 })
    } else {
      fallbackId = setTimeout(fetchFresh, 1500)
    }
    try {
      const saved = Number(localStorage.getItem(PENDING_KEY) ?? '0')
      if (Number.isFinite(saved) && saved > 0) {
        const clamped = Math.min(Math.floor(saved), 1000)
        pendingRef.current = clamped
        setLocalClicks(clamped)
        scheduleFlush()
      }
    } catch {
      /* storage unavailable — ignore */
    }
    const onBeforeUnload = () => {
      try {
        localStorage.setItem(PENDING_KEY, String(pendingRef.current))
      } catch {
        /* ignore */
      }
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && pendingRef.current > 0) {
        void flushRef.current()
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      if (fallbackId) clearTimeout(fallbackId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep SSR loader value in sync if the route revalidates.
  useEffect(() => {
    if (initialCount > 0) {
      setGlobalCount((prev) => Math.max(prev, initialCount))
      setIsCountReady(true)
    }
  }, [initialCount])

  function handleExcited() {
    // Instant local increment; debounce the network flush.
    pendingRef.current += 1
    setLocalClicks(pendingRef.current)
    try {
      localStorage.setItem(PENDING_KEY, String(pendingRef.current))
    } catch {
      /* storage unavailable — ignore */
    }
    scheduleFlush()
  }

  return { displayedCount, isCountReady, handleExcited }
}
