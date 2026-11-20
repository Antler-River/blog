import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Page } from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
  context,
}) => {
  if (context.disableRevalidate) return doc
  if (doc._status === 'published') {
    req.payload.logger.info(`Revalidating page: ${doc.slug}`)
    revalidatePath(`/${doc.slug}`)

    // old URL + nav
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/${previousDoc.slug}`)
      revalidatePath('/', 'layout')
    }
  }
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    req.payload.logger.info(`Unpublishing page: ${previousDoc.slug}`)
    revalidatePath(`/${previousDoc.slug}`)
    revalidatePath('/', 'layout')
  }

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook<Page> = ({ doc }) => {
  revalidatePath(`/${doc.slug}`)
  revalidatePath('/', 'layout')

  return doc
}
