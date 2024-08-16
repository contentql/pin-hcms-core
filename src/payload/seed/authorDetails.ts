import { Page } from 'payload-types'

export const authorDetailsPageData: Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
> = {
  title: 'Authors Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Details',
      collection_slug: 'users',
    },
  ],
}
