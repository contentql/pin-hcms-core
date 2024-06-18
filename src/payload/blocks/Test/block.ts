import { Block } from 'payload/types'

export const Test_Block: Block = {
  slug: 'Test',
  // imageURL: '',
  interfaceName: 'TestType',
  labels: {
    singular: 'Test Block',
    plural: 'Test Blocks',
  },
  fields: [
    {
      name: 'message',
      type: 'text',
      label: 'Message',
    },
  ],
}
