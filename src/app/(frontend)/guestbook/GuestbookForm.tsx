'use client'

import { useActionState } from 'react'
import { signGuestbook, type FormState } from './actions'

const initialState: FormState = { ok: false }

export function GuestbookForm() {
  const [state, formAction, pending] = useActionState(signGuestbook, initialState)

  return (
    <form action={formAction}>
      <label className="block">
        <span className="text-sm font-medium">Name</span>
        <input
          id="name"
          name="name"
          required
          maxLength={50}
          className="mt-1 block w-full border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Message</span>
        <textarea
          id="message"
          name="message"
          required
          maxLength={500}
          rows={4}
          className="mt-1 block w-full border px-3 py-2"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button type="submit" disabled={pending}>
        {pending ? 'Signing…' : 'Sign the guestbook'}
      </button>

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p role="status" className="mt-3 text-sm text-green-700">
          Thanks for signing!
        </p>
      )}
    </form>
  )
}
