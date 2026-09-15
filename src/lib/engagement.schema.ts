/**
 * Shared validation schemas — client-safe.
 * Per `file-shared-validation`: single source of truth for validation,
 * reusable in server function `.validator()` and client-side forms.
 */
import { z } from 'zod'

export const incrementExcitedSchema = z.object({
  /** Batched client clicks, flushed after 2s of inactivity. Capped to prevent abuse. */
  delta: z.number().int().min(1).max(1000).default(1),
})

export type IncrementExcitedInput = z.infer<typeof incrementExcitedSchema>

export const excitedCountSchema = z.object({
  count: z.number().int().min(0),
})

export type ExcitedCount = z.infer<typeof excitedCountSchema>
