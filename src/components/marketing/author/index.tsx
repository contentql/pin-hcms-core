import { Blog, User } from '@payload-types'

function AuthorPostsView({
  blogsData,
  authorTags,
  totalBlogs,
  author,
}: {
  blogsData: Blog[]
  totalBlogs: number
  authorTags: any
  author: User
}) {
  return (
    <div className='flex items-center justify-center'>
      <h1>Author pages </h1>
    </div>
  )
}

export default AuthorPostsView
