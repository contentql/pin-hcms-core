import { Page } from 'payload-types'

export type BlogsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const blogsPageData: BlogsPageDataType = {
  title: 'Blogs',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'ListBlock',
      title: 'Discover Blogs',
      collectionSlug: 'blogs',
    },
  ],
}
