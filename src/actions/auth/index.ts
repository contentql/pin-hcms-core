'use server'

import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicClient } from '@/lib/safe-action'

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from './validator'

const payload = await getPayload({
  config: configPromise,
})

// No need to handle try/catch that abstraction is taken care by next-safe-actions
export const signInAction = publicClient
  .metadata({
    actionName: 'signInAction',
  })
  .schema(signInSchema)
  .action(async ({ clientInput }) => {
    const { email, password } = clientInput

    const { user, token } = await payload.login({
      collection: 'users',
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
  })

export const signUpAction = publicClient
  .metadata({
    actionName: 'signUpAction',
  })
  .schema(signUpSchema)
  .action(async ({ clientInput }) => {
    const { email, username, password } = clientInput
    const response = await payload.create({
      collection: 'users',
      data: {
        username,
        email,
        password,
        role: ['user'],
      },
    })

    return response
  })

export const verifyEmailAction = publicClient
  .metadata({
    actionName: 'verifyEmailAction',
  })
  .schema(
    z.object({
      token: z.string({ message: 'Verification token is required!' }),
      userId: z.string({ message: 'User id is required!' }),
    }),
  )
  .action(async ({ clientInput }) => {
    const { token, userId } = clientInput
    const response = await payload.verifyEmail({
      collection: 'users',
      token,
    })

    if (response) {
      await payload.update({
        collection: 'users',
        where: {
          id: {
            equals: userId,
          },
        },
        data: {
          emailVerified: new Date().toDateString(),
        },
      })
    }

    return response
  })

export const forgotPasswordAction = publicClient
  .metadata({
    actionName: 'resetPasswordAction',
  })
  .schema(forgotPasswordSchema)
  .action(async ({ clientInput }) => {
    const { email } = clientInput
    const response = await payload.forgotPassword({
      collection: 'users',
      data: {
        email,
      },
    })

    return response
  })

export const resetPasswordAction = publicClient
  .metadata({ actionName: 'resetPasswordAction' })
  .schema(resetPasswordSchema)
  .action(async ({ clientInput }) => {
    const { password, token } = clientInput
    const response = await payload.resetPassword({
      collection: 'users',
      data: {
        password,
        token,
      },
      overrideAccess: true,
    })

    return response?.user
  })
