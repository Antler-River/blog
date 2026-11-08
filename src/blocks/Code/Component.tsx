import type { CodeBlock as CodeProps } from '@/payload-types'

export function Code({ language, code }: CodeProps) {
    
  return (
    <div className={`bg-gray-900 text-gray-100 p-4 relative rounded-md `}>
        <span className={`relative font-mono text-sm text-gray-400`}>{language}</span>
        <pre className={`bg-gray-700 text-gray-100 p-4 overflow-x-auto rounded-md`}>
            <code className={`font-mono text-sm`}>{code}</code>
        </pre>
    </div>

  )
}