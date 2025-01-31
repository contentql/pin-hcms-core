import configPromise from '@payload-config'
import { createSafeActionClient } from 'next-safe-action'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

const payload = await getPayload({
  config: configPromise,
})

export const publicClient = createSafeActionClient({
  // Can also be an async function.
  handleServerError(e) {
    // Log to console.
    console.error('Action error:', e.message)

    // Rethrow all server errors:
    throw e
  },
})

export const protectedClient = publicClient.use(async ({ next, ctx }) => {
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    throw new Error('User not authenticated')
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  })
})
