import { Block } from 'payload'

export const ServiceConfig: Block = {
  // slug should be the exported name of the component ex: Service
  slug: 'Service',
  interfaceName: 'ServiceType',
  fields: [
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
