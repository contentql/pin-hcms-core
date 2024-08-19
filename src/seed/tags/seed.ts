import configPromise from '@payload-config'
import { Tag } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { bulkSeed } from '@/utils/bulkSeed'

import { tagsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(Tag | string)[]> => {
  const result = bulkSeed<Tag>(payload, 'tags', tagsData)

  return result
}

export default seed
