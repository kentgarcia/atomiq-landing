/**
 * Server-only engagement storage — never import on the client.
 * Per `file-separation`: `.server.ts` holds server-only logic (DB, secrets).
 *
 * Uses Supabase (`excited_counts` single-row counter, id=1) with
 * in-memory fallback so SSR never breaks if the table is missing.
 */
import { createClient } from '@supabase/supabase-js'

let memoryCount = 0

function getSupabase() {
  // NOTE: `import.meta.env.VITE_*` must appear literally so Vite statically
  // inlines it into the server bundle at build time. `process.env` covers
  // the Node runtime (dev/SSR).
  const url =
    process.env.VITE_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    import.meta.env.VITE_SUPABASE_URL
  const key =
    process.env.VITE_SUPABASE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    import.meta.env.VITE_SUPABASE_KEY
  if (!url || !key) {
    console.error('[engagement] Missing Supabase URL/key (server)')
    return null
  }
  return createClient(url, key)
}

export async function readExcitedCount(): Promise<number> {
  try {
    const sb = getSupabase()
    if (!sb) return memoryCount
    const { data, error } = await sb
      .from('excited_counts')
      .select('count')
      .eq('id', 1)
      .single()
    if (error || !data) return memoryCount
    memoryCount = data.count ?? memoryCount
    return memoryCount
  } catch {
    return memoryCount
  }
}

export async function addExcitedCount(delta: number): Promise<number> {
  const safeDelta = Math.min(Math.max(Math.floor(delta), 1), 1000)
  try {
    const sb = getSupabase()
    if (!sb) {
      memoryCount += safeDelta
      return memoryCount
    }
    // Atomic increment via Postgres RPC — safe under concurrent spam
    // (`counter` table, single row id=1). Tries `increment_excited` first,
    // then legacy `increment_counter` for compatibility.
    for (const fn of ['increment_excited', 'increment_counter']) {
      const { data, error } = await sb.rpc(fn, { amount: safeDelta })
      if (!error && typeof data === 'number') {
        memoryCount = data
        return data
      }
    }
    const current = await readExcitedCount()
    const next = current + safeDelta
    const { error } = await sb
      .from('excited_counts')
      .upsert({ id: 1, count: next }, { onConflict: 'id' })
    if (error) {
      memoryCount += safeDelta
      return memoryCount
    }
    memoryCount = next
    return memoryCount
  } catch {
    memoryCount += safeDelta
    return memoryCount
  }
}
