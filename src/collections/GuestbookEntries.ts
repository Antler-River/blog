import type { CollectionConfig } from 'payload'

export const GuestbookEntries: CollectionConfig = {
  slug: 'guestbook-entries',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 50 },
    { name: 'message', type: 'textarea', required: true, maxLength: 500 },
  ],
}
