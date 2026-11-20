import NextImage from 'next/image'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Category } from '@/payload-types'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/utilities/siteUrl'

const getPost = cache(async (slug: string, draft: boolean) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
  })
  return docs[0] ?? null
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const post = await getPost(slug, draft)
  if (!post) return {}

  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt || undefined
  const metaImage = post.meta?.image && typeof post.meta.image === 'object' ? post.meta.image : null
  const cover = post.coverImage && typeof post.coverImage === 'object' ? post.coverImage : null
  const image = metaImage ?? cover

  return {
    title: title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      type: 'article',
      title: title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      images: image?.url ? [{ url: image.url, alt: image.alt }] : undefined,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const post = await getPost(slug, draft)
  if (!post) notFound()

  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  const categories = (post.categories ?? []).filter((c): c is Category => typeof c === 'object')

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      <ul className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <NextLink
              href={`/categories/${category.slug}`}
              className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              {category.title}
            </NextLink>
          </li>
        ))}
      </ul>
      {cover?.url && (
        <NextImage
          src={cover.url}
          alt={cover.alt}
          width={cover.width ?? 1200}
          height={cover.height ?? 630}
          className="mt-8 rounded-lg"
        />
      )}
      {post.content && (
        <div className="prose mt-8">
          <RichText data={post.content} />
        </div>
      )}
    </article>
  )
}
