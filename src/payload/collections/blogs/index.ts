import { BlogsCollection } from '@contentql/core/blog'
import { CollectionConfig } from 'payload'

import { revalidateBlogs } from './hooks/revalidateBlogs'

export const Blogs: CollectionConfig = {
  ...BlogsCollection,
  hooks: {
    ...(BlogsCollection.hooks ?? {}),
    afterChange: [
      ...(BlogsCollection.hooks?.afterChange ?? []),
      revalidateBlogs,
    ],
  },
}
