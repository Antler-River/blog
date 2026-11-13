import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Post } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({ doc, previousDoc, req }) => {
  req.payload.logger.info(`Revalidating post: ${doc.slug}`)

  revalidatePath('/')
  revalidatePath(`/posts/${doc.slug}`)
  revalidatePath('/categories/[slug]', 'page')

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidatePath(`/posts/${previousDoc.slug}`)
  }

  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook<Post> = ({ doc }) => {
  revalidatePath('/')
  revalidatePath(`/posts/${doc.slug}`)
  revalidatePath('/categories/[slug]', 'page')
  return doc
}
