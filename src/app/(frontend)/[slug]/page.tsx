import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/utilities/siteUrl'

const getPage = cache(async (slug: string, draft: boolean) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
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
  const page = await getPage(slug, draft)
  if (!page) return {}

  return {
    title: page.title,
    openGraph: {
      siteName: SITE_NAME,
      type: 'website',
      title: page.title,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(slug, draft)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout ?? []} />
}
