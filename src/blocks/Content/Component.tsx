import { RichText } from '@/components/RichText'
import type { ContentBlock as ContentProps } from '@/payload-types'

export function Content({ body }: ContentProps) {
  return (
    <section className="prose mx-auto max-w-2xl px-4 py-12">
      <RichText data={body} />
    </section>
  )
}