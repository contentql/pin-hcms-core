import { Page } from 'payload-types'

export const authorPageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Authors',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      title: 'Discover Authors',
      collection_slug: 'users',
    },
  ],
}
