// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { cqlConfig } from '@contentql/core'
import { env } from '@env'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'

import { blocks } from '@/payload/blocks/index'
import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { scheduleDocPublish } from '@/plugins/schedule-doc-publish'
import { generateBreadcrumbsUrl } from '@/utils/generateBreadcrumbsUrl'
import {
  generateDescription,
  generateImage,
  generateTitle,
  generateURL,
} from '@/utils/seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const baseUrl = env.PAYLOAD_URL

        return `${baseUrl}/${data.path}${locale ? `?locale=${locale.code}` : ''}`
      },

      collections: ['pages', 'blogs'],

      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],
  plugins: [
    nestedDocsPlugin({
      collections: [COLLECTION_SLUG_PAGE],
      generateURL: generateBreadcrumbsUrl,
    }),
    seoPlugin({
      collections: ['blogs'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateImage,
      generateURL,
    }),
    scheduleDocPublish({
      enabled: true,
      collections: ['blogs'],
      position: 'sidebar',
    }),
  ],
  secret: env.PAYLOAD_SECRET,
  dbURL: env.DATABASE_URI,

  s3: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    bucket: env.S3_BUCKET,
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  blocks,
})
