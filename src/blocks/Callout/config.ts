import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: ['info', 'warning', 'tip'],
    },
    { name: 'text', type: 'textarea', required: true },
  ],
}