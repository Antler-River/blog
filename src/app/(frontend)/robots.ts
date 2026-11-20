import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/utilities/siteUrl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
