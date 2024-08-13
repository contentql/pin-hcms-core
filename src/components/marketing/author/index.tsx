import { User } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/components/common/Tabs'

interface UserData extends User {
  count: number
}

const AuthorsListView = ({ authors }: { authors: any }) => {
  const tabs = [
    {
      title: 'Authors',
      id: 'AuthorsData',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: authors,
    },
  ]
  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <p className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          Get Started with src/app/(app)/(marketing)/author
        </p>
        <Link
          href={`/authors/${authors?.at(0)?.name}`}
          className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          view blogs
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default AuthorsListView
