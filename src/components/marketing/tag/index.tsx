import { Blog } from '@payload-types'

function TagBlogListView({
  tagDetails,
  blogs,
}: {
  tagDetails: any
  blogs: Blog[]
}) {
  return (
    <div>
      <h1>Tags</h1>
    </div>
  )
}

export default TagBlogListView
