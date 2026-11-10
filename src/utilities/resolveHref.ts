import type { Page } from '@/payload-types'

type LinkTarget = {
  type?: 'page' | 'url' | null
  page?: number | Page | null
  url?: string | null
}

export function resolveHref(link: LinkTarget | null | undefined): string {
  if (link?.type === 'url') return link.url ?? '#'
  if (link?.page && typeof link.page === 'object') return `/${link.page.slug}`
  return '#'
}
