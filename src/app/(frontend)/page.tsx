import NextLink from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 1,
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Gensou.space</h1>
      <ul className="mt-10 space-y-10">
        {posts.map((post) => (
          <li key={post.id}>
            <NextLink href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-2xl font-semibold group-hover:underline">{post.title}</h2>
              {post.publishedAt && (
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
              {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
