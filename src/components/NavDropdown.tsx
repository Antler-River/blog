'use client'

import NextLink from 'next/link'
import { useState } from 'react'

type Props = {
  label: string
  links: { label: string; href: string; newTab?: boolean | null }[]
}

export function NavDropdown({ label, links }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        {label}
      </button>
      {open && (
        <ul className="absolute left-0 top-full mt-2 min-w-48 rounded-md border bg-white p-2 shadow-lg z-10">
          {links.map((link) => (
            <li key={link.href}>
              <NextLink
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noreferrer' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
