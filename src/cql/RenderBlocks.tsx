import config from 'cql.config'

import { serverClient } from '@/trpc/serverClient'

export default async function RenderBlocks({ route }: { route: string[] }) {
  const renderBlocks = config.blockComponents

  const pageData = await serverClient.page.getPageData({
    path: route,
  })

  if (pageData?.layout && renderBlocks) {
    return pageData.layout?.map(details => {
      const Element = renderBlocks[details.blockType]

      return <Element key={details.blockType} {...details} />
    })
  }

  return null
}
