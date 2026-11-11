import type { Field } from 'payload'

export const linkTargetFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'reference',
    options: [
      { label: 'Internal', value: 'reference' },
      { label: 'External URL', value: 'url' },
      { label: 'Site route', value: 'route' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    name: 'reference',
    type: 'relationship',
    relationTo: ['pages', 'posts', 'categories'],
    admin: { condition: (_, siblingData) => siblingData?.type === 'reference' },
  },
  {
    name: 'url',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.type === 'url' },
  },
  {
    name: 'route',
    type: 'select',
    options: [
      { label: 'Home', value: '/' },
      { label: 'Guestbook', value: '/guestbook' },
    ],
    admin: { condition: (_, siblingData) => siblingData?.type === 'route' },
  },
  { name: 'newTab', type: 'checkbox', label: 'Open in new tab' },
]
