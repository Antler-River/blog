import NextLink from 'next/link'
import type { Header } from '@/payload-types'
import { resolveHref } from '@/utilities/resolveHref'
import { NavDropdown } from './NavDropdown'

type NavItem = NonNullable<Header['navItems']>[number]
export type NavLink = { label: string; href: string; newTab: boolean }
type PreparedItem =
  | { kind: 'link'; id: string; link: NavLink }
  | { kind: 'dropdown'; id: string; label: string; links: NavLink[] }

function toLink(
  label: string,
  target: Parameters<typeof resolveHref>[0],
  newTab: boolean | null | undefined,
): NavLink {
  return { label, href: resolveHref(target), newTab: Boolean(newTab) }
}

function prepareItem(item: NavItem, index: number): PreparedItem {
  const id = item.id ?? String(index)

  if (item.kind === 'dropdown') {
    const links = (item.children ?? []).map((child) => toLink(child.label, child, child.newTab))
    return { kind: 'dropdown', id, label: item.label, links }
  }

  return { kind: 'link', id, link: toLink(item.label, item.link, item.link?.newTab) }
}

export function SiteHeader({ items }: { items: NavItem[] }) {
  const prepared = items.map(prepareItem)

  return (
    <nav>
      <ul className="flex gap-6">
        {prepared.map((item) => (
          <li key={item.id}>
            {item.kind === 'dropdown' ? (
              <NavDropdown label={item.label} links={item.links} />
            ) : (
              <NextLink
                href={item.link.href}
                target={item.link.newTab ? '_blank' : undefined}
                rel={item.link.newTab ? 'noopener noreferrer' : undefined}
              >
                {item.link.label}
              </NextLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
