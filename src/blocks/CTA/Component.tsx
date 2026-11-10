import NextLink from 'next/link'
import type { CTABlock as CtaProps } from '@/payload-types'

export function CTA({ heading, text, buttonLabel, buttonUrl }: CtaProps) {
  return (
    <section className="mx-auto max-w-4xl p-20 text-center">
      <div className="bg-gray-500 rounded-md">
        <h2 className="text-4xl font-semibold p-6 text-white">{heading}</h2>
        {text && <p className="text-sm font-normal p-6 text-white">{text}</p>}
        <div className="p-6 pb-8">
          <NextLink
            className="bg-white font-mono text-black p-4 rounded-md hover:bg-gray-300"
            href={buttonUrl}
          >
            {buttonLabel}
          </NextLink>
        </div>
      </div>
    </section>
  )
}
