'use client'

import { Params } from '../types'
import { Blog, DynamicContentTypes, Tag } from '@payload-types'
import React from 'react'

import AuthorsListView from '@/components/marketing/author'
import BlogPostsView from '@/components/marketing/blog'
import TagListView from '@/components/marketing/tag'
import { trpc } from '@/trpc/client'

interface ListProps extends DynamicContentTypes {
  params: Params
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogPostsView blogs={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: tags } = trpc.tag.getAllTags.useQuery()
      return <TagListView tags={tags as Tag[]} />
    }

    case 'users': {
      const { data: authors } = trpc.author.getAllAuthorsWithCount.useQuery()

      return <AuthorsListView authors={authors} />
    }
  }
}

export default List
