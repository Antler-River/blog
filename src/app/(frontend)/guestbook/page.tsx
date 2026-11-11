import { getPayload } from 'payload'
import config from '@/payload.config'
import { GuestbookForm } from './GuestbookForm'

export default async function Guestbook() {
  const payload = await getPayload({ config })
  const { docs: guestbookEntries } = await payload.find({
    collection: 'guestbook-entries',
    sort: '-createdAt',
    limit: 50,
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Guestbook</h1>
      <GuestbookForm />
      {guestbookEntries.length === 0 ? (
        <p className="mt-12 text-gray-500">No entries yet. Be the first to sign!</p>
      ) : (
        <ul className="mt-12 space-y-6">
          {guestbookEntries.map((gEntry) => (
            <li key={gEntry.id}>
              <p className="text-base font-semibold">{gEntry.name}</p>
              {gEntry.createdAt && (
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(gEntry.createdAt).toLocaleDateString()}
                </p>
              )}
              <p className="whitespace-pre-line">{gEntry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
