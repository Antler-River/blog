import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'ts',
      options: ['TypeScript', 'Bash', 'CSS'],
    },
    { name: 'code', type: 'textarea', required: true },
  ],
}