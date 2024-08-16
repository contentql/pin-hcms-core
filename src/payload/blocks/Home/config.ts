import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'Home',
  // imageURL: '',
  interfaceName: 'HomeType',
  labels: {
    singular: 'Home Block',
    plural: 'Home Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'sub_heading',
      type: 'text',
      label: 'Sub Heading',
    },
  ],
}

export default HomeConfig
