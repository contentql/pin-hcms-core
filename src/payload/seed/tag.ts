import { Page } from 'payload-types'

export const authorPageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Tags',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      title: 'Discover Tags',
      collection_slug: 'tags',
    },
  ],
}
