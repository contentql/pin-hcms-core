import configPromise from '@payload-config'
import { Tag } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { bulkSeed } from '@/utils/bulkSeed'

import { tagsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<void> => {
  try {
    const result = await bulkSeed<Tag>(payload, 'tags', tagsData)

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
