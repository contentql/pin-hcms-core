import { PagesCollection } from '@contentql/core/blog'
import { CollectionConfig } from 'payload'

import { blocksConfig } from '@/payload/blocks/config'

import { revalidatePages } from './hooks/revalidatePages'

const pagesConfig = PagesCollection({ blocks: blocksConfig })

export const Pages: CollectionConfig = {
  ...pagesConfig,
  hooks: {
    ...(pagesConfig.hooks ?? {}),
    afterChange: [...(pagesConfig.hooks?.afterChange ?? []), revalidatePages],
  },
}
