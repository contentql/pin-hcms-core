import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { COLLECTION_SLUG_USER } from '@/payload/collections/constants'
import { router, userProcedure } from '@/trpc/'

import { UpdateUserSchema } from './validator'

const payload = await getPayloadHMR({ config: configPromise })

export const userRouter = router({
  // ! use this route only if you need a user when loading the page
  getUser: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    return user
  }),

  updateUserAvatar: userProcedure
    .input(z.object({ avatar: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { avatar } = input
        const { user } = ctx
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            avatar,
          },
        })
        return { success: true }
      } catch (error) {
        console.log('error while updating avatar', error)
      }
    }),

  updateUser: userProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const { confirmPassword, ...data } = input

      if (data.password && data.password !== confirmPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Passwords do not match',
        })
      }

      try {
        const updatedUser = await payload.update({
          collection: COLLECTION_SLUG_USER,
          id: user.id,
          data,
        })

        return updatedUser
      } catch (error: any) {
        console.error('Error updating user:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  deleteUser: userProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx

    try {
      await payload.delete({
        collection: COLLECTION_SLUG_USER,
        id: user.id,
      })
      const cookieStore = cookies()
      cookieStore.delete('payload-token')

      return { success: true }
    } catch (error: any) {
      console.error('Error deleting user:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
