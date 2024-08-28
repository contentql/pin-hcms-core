import deepmerge from 'deepmerge'
import type { Field } from 'payload'

const pathModeField = (overrides?: Partial<Field>): Field =>
  deepmerge<Field, Partial<Field>>(
    {
      name: 'pathMode',
      label: 'Path Mode',
      type: 'radio',
      options: [
        {
          label: 'Generate',
          value: 'generate',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      defaultValue: 'generate',
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    overrides || {},
  )

export default pathModeField
