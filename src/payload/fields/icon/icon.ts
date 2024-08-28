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

/**
 * Creates a configuration object for an "icon" field in Payload CMS with optional overrides.
 *
 * This function generates a configuration object for an "icon" field, allowing the user to select from a list of available
 * Heroicons (`react-icons/hi2`). It uses the `deepMerge` utility to combine default field settings with any provided overrides.
 *
 * @param {Partial<Field>} [overrides={}] - Optional overrides to customize the default field configuration. These overrides are merged with the default configuration.
 * @returns {Field} - The complete field configuration object, including default settings and any provided overrides.
 *
 * @example
 * // Example with custom field settings and overrides
 * iconField({
 *   label: 'Choose an Icon',
 *   admin: {
 *     layout: 'vertical',
 *   },
 * });
 *
 * // The `customIconField` object will contain merged configurations
 * // with the base "icon" field settings and the provided overrides,
 * // including a custom label and admin layout.
 */
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
