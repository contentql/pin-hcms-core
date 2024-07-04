import { Blog, Tag, User } from '@payload-types'

const BlogsByAuthorAndTagView = ({
  tagDetails,
  authorDetails,
  blogsData,
}: {
  authorDetails: User
  tagDetails: Tag
  blogsData: Blog[]
}) => {
  return <h1>Author Blogs</h1>
}

export default BlogsByAuthorAndTagView
