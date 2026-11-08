import type { CalloutBlock as CalloutProps } from '@/payload-types'

const styles: Record<CalloutProps['style'], string> = {
  info: 'border-blue-500 bg-blue-50 text-blue-900',
  warning: 'border-amber-500 bg-amber-50 text-amber-900',
  tip: 'border-green-500 bg-green-50 text-green-900',
}

export function Callout({ style, text }: CalloutProps) {
  return (
    <div className={`not-prose my-6 rounded-md border-l-4 p-4 ${styles[style]}`}>
      <p>{text}</p>
    </div>
  )
}