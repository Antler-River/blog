import NextImage from 'next/image'
import type { HeroBlock as HeroProps } from '@/payload-types'

export function Hero({ heading, subheading, image }: HeroProps) {
  const img = typeof image === 'object' ? image : null

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="text-5xl font-bold tracking-tight">{heading}</h1>
      {subheading && <p className="mt-4 text-lg text-gray-600">{subheading}</p>}
      {img?.url && (
        <NextImage
          src={img.url}
          alt={img.alt}
          width={img.width ?? 1200}
          height={img.height ?? 630}
          className="mt-10 rounded-xl"
        />
      )}
    </section>
  )
}