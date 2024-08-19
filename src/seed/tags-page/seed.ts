import { Page } from '@payload-types'
import { Payload } from 'payload'

import { tagsPageData } from './data'

export interface Args {
  payload: Payload
}

const seed = async ({ payload }: Args): Promise<Page> => {
  try {
    const result = await payload.create({
      collection: 'pages',
      data: tagsPageData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
