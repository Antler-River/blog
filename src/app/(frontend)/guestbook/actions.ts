'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

export type FormState = { ok: boolean; error?: string }

export async function signGuestbook(_prev: FormState, formData: FormData): Promise<FormState> {
  // Bot honeypot
  if (formData.get('website')) return { ok: true }

  // Real form
  const name = String(formData.get('name') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !message) return { ok: false, error: 'Please fill in both fields.' }
  if (name.length > 50 || message.length > 500)
    return { ok: false, error: 'That’s a bit too long.' }

  const payload = await getPayload({ config })
  await payload.create({
    collection: 'guestbook-entries',
    data: { name, message },
  })

  revalidatePath('/guestbook')
  return { ok: true }
}
