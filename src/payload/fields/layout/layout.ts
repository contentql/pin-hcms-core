import deepMerge from 'deepmerge'
import { type Field } from 'payload'

import { blocks } from '@/payload/blocks'

const layoutField = (overrides?: Partial<Field>): Field => {
  return deepMerge<Field, Partial<Field>>(
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks,
    },
    overrides || {},
  )
}

export default layoutField
