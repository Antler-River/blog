import type { Field } from 'payload'

export const linkTargetFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'page',
    options: [
      { label: 'Page', value: 'page' },
      { label: 'External URL', value: 'url' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: { condition: (_, siblingData) => siblingData?.type === 'page' },
  },
  {
    name: 'url',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.type === 'url' },
  },
  { name: 'newTab', type: 'checkbox', label: 'Open in new tab' },
]
