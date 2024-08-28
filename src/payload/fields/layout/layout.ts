import deepMerge from 'deepmerge'
import { type Field } from 'payload'

import { blocks } from '@/payload/blocks'

import { LayoutField } from './types'

const layoutField: LayoutField = (overrides = {}) => {
  return deepMerge<Field, Partial<Field>>(
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks,
    },
    overrides,
  )
}

export default layoutField
