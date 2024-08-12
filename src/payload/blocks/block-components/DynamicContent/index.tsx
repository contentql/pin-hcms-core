'use client'

import { Blog, DynamicContentTypes } from '@payload-types'

import AuthorPostsView from '@/components/marketing/author/BlogsByAuthorAndTag'
import BlogPostView from '@/components/marketing/blog/BlogPost'
import TagBlogListView from '@/components/marketing/tag/BlogsByTag'
import { trpc } from '@/trpc/client'

export const DynamicContent = ({
  block,
  slug,
}: {
  block: DynamicContentTypes
  slug: any
}) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      const { data: blog } = trpc.blog.getBlogBySlug.useQuery({
        slug: slug?.route.at(-1),
      })
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogPostView blog={blog as Blog} blogsData={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: blogs } = trpc.tag.getBlogs.useQuery({
        tagSlug: slug?.route.at(-1),
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
        authorName: slug?.route.at(-1),
      })
      const { data: authorBlogs } = trpc.author.getBlogsByAuthorName.useQuery({
        authorName: slug?.route.at(-1),
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
