import { Blog } from '@payload-types'
import { Payload } from 'payload'

import { bulkSeed } from '@/utils/bulkSeed'

import { blogsData } from './data'

export interface Args {
  payload: Payload
}

const seed = async ({ payload }: Args): Promise<(Blog | string)[]> => {
  const result = bulkSeed<Blog>(payload, 'blogs', blogsData)

  return result
}

export default seed
