import deepmerge from 'deepmerge'
import type { Field } from 'payload'

import { generateAndValidatePath } from './hooks/generateAndValidatePath'

const pathField = (overrides?: Partial<Field>): Field =>
  deepmerge<Field, Partial<Field>>(
    {
      type: 'text',
      name: 'path',
      unique: true,
      index: true,
      label: 'Path',
      hooks: {
        beforeValidate: [generateAndValidatePath],
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: '/src/payload/fields/path/components/CustomPathField.tsx',
        },
      },
    },
    overrides || {},
  )

export default pathField
