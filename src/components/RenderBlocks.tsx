import type { Page } from '@/payload-types'
import { Hero } from '@/blocks/Hero/Component'
import { Content } from '@/blocks/Content/Component'
import { CTA } from '@/blocks/CTA/Component'

export function RenderBlocks({ blocks }: { blocks: NonNullable<Page['layout']> }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={block.id} {...block} />
          case 'content':
            return <Content key={block.id} {...block} />
          case 'cta':
            return <CTA key={block.id} {...block} />
          default: {
            const unhandled: never = block
            return null
          }
        }
      })}
    </>
  )
}