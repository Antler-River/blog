import type { GlobalConfig } from 'payload'
import { linkTargetFields } from '../fields/LinkTarget'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'kind',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          admin: { layout: 'horizontal' },
        },
        {
          name: 'link',
          type: 'group',
          fields: linkTargetFields,
          admin: { condition: (_, siblingData) => siblingData?.kind === 'link' },
        },
        {
          name: 'children',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }, ...linkTargetFields],
          admin: { condition: (_, siblingData) => siblingData?.kind === 'dropdown' },
        },
      ],
    },
  ],
}
