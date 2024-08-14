import { Block } from 'payload'

const DynamicContentConfig: Block = {
  slug: 'DynamicContent',
  // imageURL: '',
  interfaceName: 'DynamicContentTypes',
  labels: {
    singular: 'Dynamic Content Block',
    plural: 'Dynamic Content Blocks',
  },
  fields: [
    {
      type: 'select',
      name: 'collection_slug',
      label: 'Collection Slug',
      options: [
        {
          label: 'Blogs',
          value: 'blogs',
        },
        {
          label: 'Tags',
          value: 'tags',
        },
        {
          label: 'Authors',
          value: 'users',
        },
      ],
    },
  ],
}

export default DynamicContentConfig
