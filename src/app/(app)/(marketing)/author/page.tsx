import AuthorsListView from '@/components/marketing/author'
import { serverClient } from '@/trpc/serverClient'

const page = async () => {
  const authors = await serverClient.author.getAllAuthorsWithCount()
  return <AuthorsListView authors={authors as any} />
}

export default page
