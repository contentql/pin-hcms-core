import { MediaCollection } from '@contentql/core/blog'
import path from 'path'
import { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  ...MediaCollection,
  upload: {
    ...(typeof MediaCollection.upload === 'object'
      ? MediaCollection.upload
      : {}),
    staticDir: path.resolve(dirname, '../../../../public/media'),
  },
}
