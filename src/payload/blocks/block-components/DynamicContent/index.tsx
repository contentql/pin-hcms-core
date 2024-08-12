'use client'

import { Params } from '../../types'
import { Blog, DynamicContentTypes } from '@payload-types'

import AuthorPostsView from '@/components/marketing/author/BlogsByAuthorAndTag'
import BlogPostView from '@/components/marketing/blog/BlogPost'
import TagBlogListView from '@/components/marketing/tag/BlogsByTag'
import { trpc } from '@/trpc/client'

interface Props extends DynamicContentTypes {
  params: Params
}

export const DynamicContent = ({ params, ...block }: Props) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      const { data: blog } = trpc.blog.getBlogBySlug.useQuery({
        slug: params?.route.at(-1),
      })
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogPostView blog={blog as Blog} blogsData={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: blogs } = trpc.tag.getBlogs.useQuery({
        tagSlug: params?.route.at(-1)!,
      })
      return (
        <TagBlogListView
          blogs={blogs?.blogsData as Blog[]}
          tagDetails={blogs?.tagData?.at(0)}
        />
      )
    }

    case 'users': {
      const { data: author } = trpc.author.getAuthorByName.useQuery({
        authorName: params?.route.at(-1)!,
      })
      const { data: authorBlogs } = trpc.author.getBlogsByAuthorName.useQuery({
        authorName: params?.route.at(-1)!,
      })

      return (
        <AuthorPostsView
          author={author as any}
          blogsData={authorBlogs as any}
        />
      )
    }
  }
}
