import React from 'react'
import './styles.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteHeader } from '@/components/SiteHeader'
import { draftMode } from 'next/headers'

export const metadata = {
  description: 'Blog',
  title: 'Gensou.space',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })
  const { isEnabled: draft } = await draftMode()

  return (
    <html lang="en">
      <body>
        {draft && (
        <div className="bg-yellow-300 px-4 py-2 text-sm">
          Preview mode, showing drafts.{' '}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler, needs full page load */}
          <a href="/next/exit-preview" className="underline">
          Exit preview
          </a>
        </div>
)}
        <SiteHeader items={header.navItems ?? []} />
        <main>{children}</main>
      </body>
    </html>
  )
}
