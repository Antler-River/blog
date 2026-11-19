import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { draftMode } from 'next/headers'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { isEnabled: draft } = await draftMode()
  const { docs } = await payload.find({
    collection: 'pages',
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
  })
  const page = docs[0]
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout ?? []} />
}
