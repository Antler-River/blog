import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero/config'
import { ContentBlock } from '../blocks/Content/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    { name: 'layout', type: 'blocks', blocks: [HeroBlock, ContentBlock] },
  ],
}