import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { CalloutBlock } from '@/payload-types'
import { Callout } from '@/blocks/Callout/Component'
import { CodeBlock } from '@/payload-types'
import { Code } from '@/blocks/Code/Component'

type NodeTypes =
  DefaultNodeTypes | SerializedBlockNode<CalloutBlock> | SerializedBlockNode<CodeBlock>

const converters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    callout: ({ node }) => <Callout {...node.fields} />,
    code: ({ node }) => <Code {...node.fields} />,
  },
})

export function RichText(props: { data: React.ComponentProps<typeof PayloadRichText>['data'] }) {
  return <PayloadRichText data={props.data} converters={converters} />
}
