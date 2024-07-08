import { Blog } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

const BlogPostView = ({
  blog,
  blogsData,
  decodedSlug,
}: {
  blog: Blog
  blogsData: Blog[]
  decodedSlug: string
}) => {
  const tabs = [
    {
      title: 'Blog Data',
      id: 'Blog data',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blog,
    },
    {
      title: 'Blogs Data',
      id: 'Blogs data',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogsData,
    },
    {
      title: 'decodedSlug',
      id: 'decodedSlug',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: decodedSlug,
    },
  ]
  return (
    <div className='mx-auto max-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <TabComponent tabs={tabs} />
      <div className='mt-4 flex items-center justify-end'>
        <Link
          href='/blog'
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          Back
        </Link>
      </div>
    </div>
  )
}

export default BlogPostView
