import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'HomeBlock',
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
      name: 'subHeading',
      type: 'text',
      label: 'Sub Heading',
    },
  ],
}

export default HomeConfig
