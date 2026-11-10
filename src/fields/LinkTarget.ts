import type { Field } from 'payload'

export const linkTargetFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'reference',
    options: [
      { label: 'Internal', value: 'reference' },
      { label: 'External URL', value: 'url' },
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
  { name: 'newTab', type: 'checkbox', label: 'Open in new tab' },
]
