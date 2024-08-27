import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrCurrentUser } from '@/payload/access'
import { slugField } from '@/payload/fields/slug'

import { assignAdminRoleIfNoAdminsExist } from './hooks/assignAdminRoleIfNoAdminsExist'
import { authorAccessAfterUpdate } from './hooks/authorAccessAfterUpdate'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Auth',
    useAsTitle: 'email',
  },

  auth: {
    cookies: {
      secure: true,
    },
  },
  hooks: {
    beforeChange: [authorAccessAfterUpdate, assignAdminRoleIfNoAdminsExist],
  },
  access: {
    admin: async ({ req }) => {
      return ['admin'].includes(req?.user?.role || 'user')
    },
    read: isAdminOrCurrentUser,
    create: () => true,
    update: isAdmin,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      saveToJWT: true,
    },
    slugField('username', {
      name: 'username',
      label: 'Username',
      type: 'text',
      saveToJWT: true,
      required: true,
      unique: true,
      admin: {
        readOnly: false,
        position: undefined,
      },
    }),
    { name: 'imageUrl', type: 'text', saveToJWT: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user', 'author'],
      saveToJWT: true,
      defaultValue: 'user',
    },
    { name: 'emailVerified', type: 'date' },
  ],
} as const
