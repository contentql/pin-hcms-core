import { TagsCollection } from '@contentql/core/blog'
import { CollectionConfig } from 'payload'

import { revalidateTags } from './hooks/revalidateTags'

export const Tags: CollectionConfig = {
  ...TagsCollection,
  hooks: {
    ...(TagsCollection.hooks ?? {}),
    afterChange: [...(TagsCollection.hooks?.afterChange ?? []), revalidateTags],
  },
}
