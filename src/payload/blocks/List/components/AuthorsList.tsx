import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/payload/blocks/common/Tabs'

interface AuthorsListProps {
  authors: any
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
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
          href={`/author/${authors?.at(0)?.name}`}
          className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          view author details
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default AuthorsList
