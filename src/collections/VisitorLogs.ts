import type { CollectionConfig } from 'payload'

export const VisitorLogs: CollectionConfig = {
  slug: 'visitor-logs',
  admin: {
    useAsTitle: 'ip',
    defaultColumns: ['country', 'ip', 'browser', 'timestamp'],
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'ip',
      type: 'text',
      required: true,
      label: 'IP Address',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      defaultValue: 'Unknown',
    },
    {
      name: 'countryCode',
      type: 'text',
      required: true,
      defaultValue: 'UN',
    },
    {
      name: 'browser',
      type: 'text',
      required: true,
      defaultValue: 'Unknown',
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
  ],
}
