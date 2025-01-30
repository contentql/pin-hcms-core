import { UsersCollection } from '@contentql/core/blog'
import { env } from '@env'
import { CollectionConfig } from 'payload'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'

import { revalidateAuthors } from './hooks/revalidateAuthors'

export const Users: CollectionConfig = {
  ...UsersCollection,
  hooks: {
    ...(UsersCollection.hooks ?? {}),
    afterChange: [
      ...(UsersCollection.hooks?.afterChange ?? []),
      revalidateAuthors,
    ],
  },
  access: {
    ...UsersCollection.access,
    create: () => true,
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return UserAccountVerification({
          actionLabel: 'verify your account',
          buttonText: 'Verify Account',
          userName: user.username,
          image: user.avatar,
          href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
        })
      },
    },
    forgotPassword: {
      generateEmailHTML: args => {
        return ResetPassword({
          resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
          userFirstName: args?.user.username,
        })
      },
    },
  },
}
