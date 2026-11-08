import type { CodeBlock as CodeProps } from '@/payload-types'

export function Code({ language, code }: CodeProps) {
    
  return (
    <div className={`bg-gray-900 text-gray-100 p-4 relative`}>
        <span className={`absolute right-3`}>{language}</span>
        <pre className={`bg-gray-700 text-gray-100 pt-8 overflow-x-auto`}>
            <code className={`font-mono text-sm`}>{code}</code>
        </pre>
    </div>

  )
}