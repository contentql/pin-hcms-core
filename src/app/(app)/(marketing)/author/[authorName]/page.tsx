import AuthorBlogs from '../_components/AuthorBlogs'
import AuthorDetails from '../_components/AuthorDetails'
import { User } from '@payload-types'

import { serverClient } from '@/trpc/serverClient'

interface PageProps {
  params: {
    authorName: string
  }
}

const Author = async ({ params }: PageProps) => {
  try {
    const blogs = await serverClient.author.getBlogsByAuthorName({
      authorName: params?.authorName,
    })
    const author = await serverClient.author.getAuthorByName({
      authorName: params?.authorName,
    })

    return (
      <>
        <AuthorDetails author={author as User} />
        <AuthorBlogs blogs={blogs} />
      </>
    )
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

export default Author
