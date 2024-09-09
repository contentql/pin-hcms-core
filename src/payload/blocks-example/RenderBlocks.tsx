'use client'

import { env } from '@env'
import { Page } from '@payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'
import config from 'cql.config'
import React from 'react'

import { trpc } from '@/trpc/client'

import { Params } from './types'

interface RenderBlocksProps {
  params: Params
  pageInitialData: Page
}

const RenderBlocks: React.FC<RenderBlocksProps> = ({
  pageInitialData,
  params,
}) => {
  const Blocks = config.blockComponents

  // Fetch the page data using path
  const { data: pageData, isLoading: isPageLoading } =
    trpc.page.getPageData.useQuery(
      { path: params.route },
      { initialData: pageInitialData },
    )

  // Fetch page data for live preview
  const { data: livePreviewData } = useLivePreview<Page | undefined>({
    initialData: undefined,
    serverURL: env.NEXT_PUBLIC_PUBLIC_URL,
    depth: 2,
  })

  // Determine which data to use based on whether live preview data is available
  const dataToUse = livePreviewData?.layout || pageData?.layout

  return (
    <div>
      {dataToUse?.map((block, index) => {
        // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
        const Block = Blocks[block.blockType]

        if (Block) {
          return <Block {...block} params={params} key={block.blockName} />
        }

        return <h3 key={block.id}>Block does not exist </h3>
      })}
    </div>
  )
}

export default RenderBlocks
