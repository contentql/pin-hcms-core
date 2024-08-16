import { Page } from 'payload-types'

export const authorPageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Tag Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Details',
      collection_slug: 'tags',
    },
  ],
}
