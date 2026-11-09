import type { Block } from 'payload'

export const CTABlock: Block = {
    slug: 'cta',
    interfaceName: 'CTABlock',
    fields: [
        { name: 'heading', type: 'textarea', required: true },
        { name: 'text', type: 'textarea', required: false },
        { name: 'buttonLabel', type: 'text', required: true },
        { 
            name: 'buttonUrl', 
            type: 'text', 
            required: true, 
            validate: (value: string | null | undefined) => value?.startsWith('/') || value?.startsWith('http') ? true : 'Use a path like /about or a full https:// link', 
        },
    ],
}