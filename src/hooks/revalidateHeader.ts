import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req }) => {
  req.payload.logger.info('Revalidating header')
  revalidatePath('/', 'layout')
  return doc
}
