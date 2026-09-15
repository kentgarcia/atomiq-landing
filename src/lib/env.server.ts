/**
 * Server-only environment config — never import on the client.
 * Per `sec-sensitive-data` + `env-functions`: validate once at startup,
 * keep secrets server-side, expose only what's needed via server functions.
 */
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export type ServerEnv = z.infer<typeof envSchema>

function validateEnv(): ServerEnv {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment configuration')
  }
  return parsed.data
}

export const serverEnv = validateEnv()
export const isProduction = serverEnv.NODE_ENV === 'production'
export const isDevelopment = serverEnv.NODE_ENV === 'development'
