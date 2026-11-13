import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'
import type { Category } from '@/payload-types'

export const revalidateCategory: CollectionAfterChangeHook<Category> = ({
  doc,
  previousDoc,
  req,
  context,
}) => {
  if (context.disableRevalidate) return doc
  req.payload.logger.info(`Revalidating category: ${doc.slug}`)

  revalidatePath(`/categories/${doc.slug}`)
  revalidatePath('/categories/[slug]', 'page')
  revalidatePath('/posts/[slug]', 'page')

  // old URL + nav
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    revalidatePath(`/categories/${previousDoc.slug}`)
    revalidatePath('/', 'layout')
  }

  return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook<Category> = ({ doc }) => {
  revalidatePath(`/categories/${doc.slug}`)
  revalidatePath('/categories/[slug]', 'page')
  revalidatePath('/posts/[slug]', 'page')
  revalidatePath('/', 'layout')

  return doc
}
