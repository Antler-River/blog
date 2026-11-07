import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const post = docs[0]
  if (!post) notFound()

  const cover = typeof post.coverImage === 'object' ? post.coverImage : null

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
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