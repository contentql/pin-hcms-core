import { Block } from 'payload'

const TestConfig: Block = {
  slug: 'Test',
  // imageURL: '',
  interfaceName: 'TestType',
  labels: {
    singular: 'Test Block',
    plural: 'Test Blocks',
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

export default TestConfig
