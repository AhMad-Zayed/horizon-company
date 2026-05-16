import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'serviceOfInterest', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company / Organization',
    },
    {
      name: 'serviceOfInterest',
      type: 'text',
      label: 'Service of Interest',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message / Inquiry',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New / Unread', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved / Closed', value: 'resolved' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
