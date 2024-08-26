import type { CollectionSlug, Config, Plugin } from 'payload'

import { publishOnField } from './fields/PublishOn'
import { triggerScheduleAfterChange } from './hooks'
import { PluginTypes } from './types'

const plugin =
  (PluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { enable = true, collections, position = 'sidebar' } = PluginOptions

    if (!enable) {
      return incomingConfig
    }

    const updatedCollections = incomingConfig.collections?.map(collection => {
      if (collections.includes(collection.slug as CollectionSlug)) {
        const fields =
          position === 'start'
            ? [publishOnField, ...collection.fields]
            : [...collection.fields, publishOnField]

        return {
          ...collection,
          fields,
          hooks: {
            ...collection.hooks,
            afterChange: [
              ...(collection.hooks?.afterChange || []),
              triggerScheduleAfterChange,
            ],
          },
        }
      }

      return collection
    })

    return {
      ...incomingConfig,
      collections: updatedCollections,
    }
  }

export default plugin
