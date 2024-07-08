import BlogPostsView from '@/components/marketing/blog'
import { serverClient } from '@/trpc/serverClient'

async function page() {
  const blogs = await serverClient.blog.getAllBlogs()
  return <BlogPostsView blogs={blogs} />
}

export default page
