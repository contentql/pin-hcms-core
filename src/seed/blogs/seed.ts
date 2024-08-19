import configPromise from '@payload-config'
import { Blog } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { bulkSeed } from '@/utils/bulkSeed'

import { blogsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<void> => {
  try {
    const result = await bulkSeed<Blog>(payload, 'blogs', blogsData)

    const errors = result.filter(item => typeof item === 'string')

    if (errors.length > 0) {
      throw new Error(
        `Seeding failed with the following errors:\n${errors.join('\n')}`,
      )
    }
  } catch (error) {
    throw error
  }
}

export default seed
