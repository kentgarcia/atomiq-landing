/**
 * Server function wrappers — safe to import anywhere.
 * Per `file-functions-file` + `sf-create-server-fn` + `sf-method-selection`:
 * - `.functions.ts` holds `createServerFn` wrappers only.
 * - GET (default) for reads, POST for mutations.
 * - Server-only helpers are imported lazily inside handlers so they
 *   never leak into the client bundle (`sec-sensitive-data`).
 */
import { createServerFn } from '@tanstack/react-start'
import { incrementExcitedSchema } from './engagement.schema'

/** GET — read the global excited count (idempotent, cacheable). */
export const getExcitedCount = createServerFn().handler(async () => {
  const { readExcitedCount } = await import('./engagement.server')
  const count = await readExcitedCount()
  return { count }
})

/** POST — increment the global excited count (mutation, never cached). */
export const incrementExcitedCount = createServerFn({ method: 'POST' })
  .validator(incrementExcitedSchema)
  .handler(async ({ data }) => {
    const { addExcitedCount } = await import('./engagement.server')
    const count = await addExcitedCount(data.delta)
    return { count }
  })
