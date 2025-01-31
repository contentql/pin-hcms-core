'use server'

import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import { publicClient } from '@/lib/safe-action'

import { signInSchema } from './validator'

const payload = await getPayload({
  config: configPromise,
})

export const signInAction = publicClient
  .schema(signInSchema)
  .action(async ({ clientInput }) => {
    const { email, password } = clientInput

    try {
      const { user, token } = await payload.login({
        collection: 'users', // required
        data: {
          email,
          password,
        },
      })

      const cookieStore = await cookies()
      cookieStore.set('payload-token', token || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return user
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Failed to login!')
    }
  })
