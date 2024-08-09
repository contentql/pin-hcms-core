import configPromise from '@payload-config'
import { Page as PageType } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'

import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { serverClient } from '@/trpc/serverClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// ! TODO:

// const p = [['authors', 'detail', 'details']]
// const u = ['authors', 'admin', 'akhil']
// author/admin
// const compareRoutes = (
//   parentRoutes: string[][],
//   urlRoute: string[],
// ): boolean => {
//   return parentRoutes.some(
//     parentRoute =>
//       parentRoute.length >= 2 &&
//       parentRoute
//         .slice(0, -1)
//         .every((route, index) => route === urlRoute[index]),
//   )
// }

const countOccurrences = (arr: string[], target: string): number => {
  return arr.reduce((count, item) => {
    return item === target ? count + 1 : count
  }, 0)
}

const compareRoutes = (
  parentRoutes: string[][],
  urlRoute: string[],
): boolean => {
  return parentRoutes.some(parentRoute => {
    const value = countOccurrences(parentRoute, 'details') * -1

    console.log(value, parentRoute, urlRoute, parentRoute.slice(0, -2))
    return (
      parentRoute.length >= 2 &&
      parentRoute
        .slice(0, value) // ['authors', 'details', 'details]
        .every((route, index) => route === urlRoute.slice(0, value)[index]) // ['authors', 'akhil', 'tag]
    )
  })
}

const Page = async ({ params }: { params: { route: string[] } }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: existingPages } = await payload.find({ collection: 'pages' })

  const allPages = existingPages.map(page => page.path)
  const urlRouteExistInPages = allPages.includes(
    `/${params.route && params.route.join('/')}`,
  )

  const childrenPageRoutes = existingPages
    .filter((fullPageData: PageType) => {
      return fullPageData.parent
    })
    .map((fullPageData: PageType) => {
      return fullPageData.path
    })

  const requiredRouteFormat = childrenPageRoutes.map((path: any) => {
    const arrayWithDetails = path.split('/').filter(Boolean)

    return arrayWithDetails
  })

  // console.log({ allPages })
  // console.log({ requiredRouteFormat })

  let importantData

  console.log(params.route) // ['authors', 'akhil', 'tags']

  console.log(params.route && compareRoutes(requiredRouteFormat, params.route))

  if (!urlRouteExistInPages) {
    // const value = countOccurrences(parentRoute, 'details')
    if (params.route && compareRoutes(requiredRouteFormat, params.route)) {
      importantData = params.route.pop() // ['authors', 'akhil',]
      params.route.push('details') // ['authors', 'akhil', 'details']
    }
  }

  try {
    const pageData = await serverClient.page.getPageData({
      path: params?.route,
    })

    return <RenderBlocks pageInitialData={pageData as PageType} slug={params} />
  } catch (error) {
    console.error('Error: Page not found')
    notFound()
  }
}

export default Page
