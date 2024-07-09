import TagListView from '@/components/marketing/tag'
import { serverClient } from '@/trpc/serverClient'

const page = async () => {
  const tags = await serverClient.tag.getAllTags()
  return <TagListView tags={tags} />
}

export default page
