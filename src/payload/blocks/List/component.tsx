'use client'

import { Params } from '../types'
import { Blog, DetailsType, Tag } from '@payload-types'
import React from 'react'

import { trpc } from '@/trpc/client'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends DetailsType {
  params: Params
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogsList blogs={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: tags } = trpc.tag.getAllTags.useQuery()
      return <TagsList tags={tags as Tag[]} />
    }

    case 'users': {
      const { data: authors } = trpc.author.getAllAuthorsWithCount.useQuery()

      return <AuthorsList authors={authors} />
    }
  }
}

export default List
