import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'iconName',
      type: 'text',
      required: true,
      admin: {
        description: "Name of Lucide icon (e.g. 'Server', 'ShieldCheck', 'Network', 'Phone', 'Wifi', 'Video')",
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
