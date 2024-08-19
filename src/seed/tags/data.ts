import { Tag } from 'payload-types'

export type TagDataType = Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>

export const tagsData: TagDataType[] = [
  {
    title: 'Welcome',
    color: 'blue',
    description: 'This is a welcome tag',
    tagImage: '',
    _status: 'published',
  },

  {
    title: 'Management',
    color: 'purple',
    description: 'This is a Project Management tag',
    tagImage: '',
    _status: 'published',
  },
  {
    title: 'AI Insights',
    color: 'indigo',
    description: 'This is a AI Insights tag',
    tagImage: '',
    _status: 'published',
  },
  {
    title: 'Enterprise',
    color: 'green',
    description: 'This is a Enterprise tag',
    tagImage: '',
    _status: 'published',
  },
]
