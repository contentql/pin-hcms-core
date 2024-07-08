import { Blog } from '@payload-types'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

const BlogPostsView = ({ blogs }: { blogs: Blog[] }) => {
  const tabs = [
    {
      title: 'Blogs Data',
      id: 'Blogs data',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogs,
    },
    {
      title: 'Blogs',
      id: 'Blogs',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: blogs,
    },
  ]
  return (
    <div className='mx-auto max-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <TabComponent tabs={tabs} />
      {/* <div className='mt-4 flex items-center justify-end'>
        <Link
          href='/blog/blogpost'
          className='rounded-lg border-2 border-neutral-800 bg-zinc-800 px-4 py-2'>
          view blog post
        </Link>
      </div> */}
    </div>
  )
}

export default BlogPostsView
