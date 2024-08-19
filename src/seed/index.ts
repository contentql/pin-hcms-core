import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { seedAuthorDetailsPage } from './author-details-page'
import { seedAuthorsPage } from './authors-page'
import { seedBlogDetailsPage } from './blog-details-page'
import { seedBlogsPage } from './blogs-page'
import { seedHomePage } from './home-page'
import { seedTagDetailsPage } from './tag-details-page'
import { seedTagsPage } from './tags-page'

const runAllSeeds = async () => {
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    await seedHomePage({ payload })
    await seedBlogsPage({ payload })
    await seedBlogDetailsPage({ payload })
    await seedBlogsPage({ payload })
    await seedTagsPage({ payload })
    await seedTagDetailsPage({ payload })
    await seedAuthorsPage({ payload })
    await seedAuthorDetailsPage({ payload })
    await seedAuthorsPage({ payload })
  } catch (error) {
    console.error('Error running seeds:', error)
  }
}

runAllSeeds()
