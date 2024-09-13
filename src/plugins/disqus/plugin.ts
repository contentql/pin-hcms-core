import type { CollectionSlug, Config, Plugin } from 'payload'

import { PluginTypes } from './types'

const plugin =
  (options: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { collections, enabled } = options

    if (!enabled) {
      return incomingConfig
    }

    const updatedCollections = incomingConfig.collections?.map(collection => {
      if (collections.includes(collection.slug as CollectionSlug)) {
        return {
          ...collection,
          fields: [
            ...JSON.parse(JSON.stringify(collection.fields)),
            {
              name: 'disqusComments',
              label: 'Disqus Comments',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                position: 'sidebar',
              },
            },
          ],
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
