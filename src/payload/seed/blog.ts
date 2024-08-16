import { Page } from 'payload-types'

export const authorPageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Blogs',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      title: 'Discover Blogs',
      collection_slug: 'blogs',
    },
  ],
}
