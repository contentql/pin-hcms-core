import { Page } from '@payload-types'
import { Payload } from 'payload'

import { authorsPageData } from './data'

export interface Args {
  payload: Payload
}

const seed = async ({ payload }: Args): Promise<Page> => {
  try {
    const result = await payload.create({
      collection: 'pages',
      data: authorsPageData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
