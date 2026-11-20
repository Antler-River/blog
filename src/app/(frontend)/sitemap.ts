import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { SITE_URL } from '@/utilities/siteUrl'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [posts, pages, categories] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      pagination: false,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
      pagination: false,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'categories',
      pagination: false,
      select: { slug: true, updatedAt: true },
    }),
  ])

  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/guestbook` },
    ...posts.docs.map((p) => ({ url: `${SITE_URL}/posts/${p.slug}`, lastModified: p.updatedAt })),
    ...pages.docs.map((p) => ({ url: `${SITE_URL}/${p.slug}`, lastModified: p.updatedAt })),
    ...categories.docs.map((c) => ({
      url: `${SITE_URL}/categories/${c.slug}`,
      lastModified: c.updatedAt,
    })),
  ]
}
