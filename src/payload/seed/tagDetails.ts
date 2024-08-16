import { Page } from 'payload-types'

export const tagDetailsPageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> =
  {
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
