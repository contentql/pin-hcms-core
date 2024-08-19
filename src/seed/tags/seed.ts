import { Tag } from '@payload-types'
import { Payload } from 'payload'

import { bulkSeed } from '@/utils/bulkSeed'

import { tagsData } from './data'

export interface Args {
  payload: Payload
}

const seed = async ({ payload }: Args): Promise<(Tag | string)[]> => {
  const result = bulkSeed<Tag>(payload, 'tags', tagsData)

  return result
}

export default seed
