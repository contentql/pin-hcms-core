import deepMerge from 'deepmerge'
import type { Field } from 'payload'
import * as HiIcons from 'react-icons/hi2'

import { IconField } from './types'

const iconOptions = Object.entries(HiIcons)
  .filter(([key, value]) => typeof value === 'function')
  .map(([key]) => ({
    value: key,
    label: key.replace(/([a-z])([A-Z])/g, '$1 $2'),
  }))

const iconField: IconField = (overrides = {}) => {
  return deepMerge<Field, Partial<Field>>(
    {
      type: 'select',
      name: 'icon',
      label: 'Icon',
      options: iconOptions,
    },
    overrides,
  )
}

export default iconField
