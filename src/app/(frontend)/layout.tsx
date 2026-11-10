import React from 'react'
import './styles.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata = {
  description: 'Blog',
  title: 'Gensou.space',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })

  return (
    <html lang="en">
      <body>
        <SiteHeader items={header.navItems ?? []} />
        <main>{children}</main>
      </body>
    </html>
  )
}
