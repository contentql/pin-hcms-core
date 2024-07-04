import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { sendMessageToClient } from '@/lib/clients'
import { seed } from '@/payload/seed'
import { homePageData } from '@/payload/seed/data/home'

const CLIENT_ID = '1'

const notifyClient = async (message: string) => {
  // const result = await fetch(`${env.PAYLOAD_URL}/api/sse/webhook`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     clientId: CLIENT_ID,
  //     message,
  //   }),
  // })

  // return result

  sendMessageToClient(CLIENT_ID, JSON.stringify({ message }))
}

const seeding = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  console.log('Starting the seeding process')
  notifyClient('Starting the seeding process')

  const homePageSeedResult = await seed({
    payload,
    collectionsToSeed: [
      {
        collectionSlug: 'pages',
        seed: [
          {
            data: {
              ...homePageData,
            },
          },
        ],
      },
    ],
    skipSeeding: false,
  })
  if (
    homePageSeedResult.collectionsSeedingResult.at(0)?.status === 'fulfilled'
  ) {
    notifyClient('Home page loaded successfully.')
  } else {
    notifyClient('Error while loading blog page.')
  }
  notifyClient(`Seeding process completed.`)
  sendMessageToClient(CLIENT_ID, JSON.stringify({ success: true }))
}

export default seeding
