import configPromise from '@payload-config'
import { Blog } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { bulkSeed } from '@/utils/bulkSeed'

import { blogsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(Blog | string)[]> => {
  const result = bulkSeed<Blog>(payload, 'blogs', blogsData)

  return result
}

export default seed
