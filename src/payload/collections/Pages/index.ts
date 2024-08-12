import type { CollectionConfig } from 'payload'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { pathField, slugField } from '@/payload/fields'
import { blocksField } from '@/payload/fields/blocks'

export const Pages: CollectionConfig = {
  slug: COLLECTION_SLUG_PAGE,
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.isDynamic && data.path) {
          const segments = data.path.split('/')
          const lastSegment = segments[segments.length - 1]

          // Check if the last segment already has square brackets
          if (!lastSegment.startsWith('[') || !lastSegment.endsWith(']')) {
            data.path = segments.slice(0, -1).join('/') + `/[${lastSegment}]`
          } else {
            data.path = segments.join('/')
          }
        }

        return data
      },
    ],
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt', 'createdAt'],
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isHome',
          label: 'Home Page',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'isDynamic',
          label: 'Dynamic Page',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    blocksField(),
    slugField(),
    pathField({
      admin: {
        readOnly: false,
      },
    }),
  ],
}
