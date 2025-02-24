import { cqlConfig } from '@contentql/core'
import { env } from '@env'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Blogs } from '@/payload/collections/blogs'
import { Media } from '@/payload/collections/media'
import { Pages } from '@/payload/collections/pages'
import { Tags } from '@/payload/collections/tags'
import { Users } from '@/payload/collections/users'
import { SiteSettings } from '@/payload/globals/siteSettings'

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
  },
  baseURL: env.PAYLOAD_URL,
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],
  secret: env.PAYLOAD_SECRET,

  dbURI: env.DATABASE_URI,
  dbSecret: env.DATABASE_SECRET,
  syncDB: false,

  collections: [Users, Media, Pages, Blogs, Tags],
  globals: [SiteSettings],

  // Note: If you're using S3, you'll need to uncomment this section and comment staticDir in the Media collection

  // s3: {
  //   collections: {
  //     media: true,
  //   },
  //   bucket: env.S3_BUCKET!,
  //   config: {
  //     credentials: {
  //       accessKeyId: env.S3_ACCESS_KEY_ID!,
  //       secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
  //     },
  //     endpoint: env.S3_ENDPOINT,
  //     region: env.S3_REGION,
  //   },
  // },

  // Note: If you're using resend, you'll need to uncomment this section

  // resend: {
  //   apiKey: env.RESEND_API_KEY!,
  //   defaultFromAddress: env.RESEND_SENDER_EMAIL!,
  //   defaultFromName: env.RESEND_SENDER_NAME!,
  // },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,
  editor: slateEditor({
    admin: {
      leaves: [
        {
          Button: 'src/payload/slate/strong/Button',
          Leaf: 'src/payload/slate/strong/Leaf',
          name: 'strong',
        },
        {
          Button: 'src/payload/slate/pre/Button',
          Leaf: 'src/payload/slate/pre/Leaf',
          name: 'pre',
        },
        {
          Button: 'src/payload/slate/mark/Button',
          Leaf: 'src/payload/slate/mark/Leaf',
          name: 'mark',
        },
        {
          Button: 'src/payload/slate/kbd/Button',
          Leaf: 'src/payload/slate/kbd/Leaf',
          name: 'kbd',
        },
        {
          Button: 'src/payload/slate/custom-iframe/Button',
          Leaf: 'src/payload/slate/custom-iframe/Leaf',
          name: 'custom-iframe',
        },
        {
          Button: 'src/payload/slate/italic/Button',
          Leaf: 'src/payload/slate/italic/Leaf',
          name: 'italic',
        },
        {
          Button: 'src/payload/slate/Strikethrough/Button',
          Leaf: 'src/payload/slate/Strikethrough/Leaf',
          name: 'strikethrough',
        },
        {
          Button: 'src/payload/slate/underline/Button',
          Leaf: 'src/payload/slate/underline/Leaf',
          name: 'underline',
        },
      ],
    },
  }),
})
