import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero/config'
import { ContentBlock } from '../blocks/Content/config'
import { CTABlock } from '../blocks/CTA/config'
import { revalidatePage, revalidatePageDelete } from '@/hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    preview: (doc) => `/next/preview?path=${encodeURIComponent(`/${doc.slug}`)}`,
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    { name: 'layout', type: 'blocks', blocks: [HeroBlock, ContentBlock, CTABlock] },
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
}
