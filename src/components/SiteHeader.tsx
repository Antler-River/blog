import { NavDropdown } from './NavDropdown'
import NextLink from 'next/link'
import type { Header } from '@/payload-types'
import { resolveHref } from '@/utilities/resolveHref'

type Props = {
  items: NonNullable<Header['navItems']>
}

export function SiteHeader({ items }: Props) {
  return (
    <nav>
      <ul className="flex gap-6">
        {items.map((item) => {
          const links = (item.children ?? []).map((child) => ({
            label: child.label,
            href: resolveHref(child),
            newTab: child.newTab,
          }))

          return (
            <li key={item.id}>
              {item.kind === 'dropdown' ? (
                <NavDropdown label={item.label} links={links} />
              ) : (
                <NextLink href={resolveHref(item.link)}>{item.label}</NextLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
