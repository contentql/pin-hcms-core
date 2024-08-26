import { CollectionSlug } from 'payload'

type Position = 'sidebar' | 'start' | 'end'

export interface PluginTypes {
  enable?: boolean
  collections: CollectionSlug[]
  position?: Position
}
