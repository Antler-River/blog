import type { Category, Page, Post } from '@/payload-types'

type Reference =
  | { relationTo: 'pages'; value: number | Page }
  | { relationTo: 'posts'; value: number | Post }
  | { relationTo: 'categories'; value: number | Category }

type LinkTarget = {
  type?: 'reference' | 'url' | 'route' | null
  reference?: Reference | null
  route?: string | null
  url?: string | null
}

const prefixes: Record<Reference['relationTo'], string> = {
  pages: '',
  posts: '/posts',
  categories: '/categories',
}

export function resolveHref(link: LinkTarget | null | undefined): string {
  if (link?.type === 'url') return link.url ?? '#'
  if (link?.type === 'route') return link.route ?? '#'

  const ref = link?.reference
  if (!ref || typeof ref.value !== 'object') return '#'

  return `${prefixes[ref.relationTo]}/${ref.value.slug}`
}
