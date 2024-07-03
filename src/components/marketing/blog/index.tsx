import { Blog } from '@payload-types'

const BlogPostView = ({
  blog,
  blogsData,
  decodedSlug,
}: {
  blog: Blog
  blogsData: Blog[]
  decodedSlug: string
}) => {
  return (
    <div className='px-2'>
      <h1>Blog posts</h1>
    </div>
  )
}

export default BlogPostView
