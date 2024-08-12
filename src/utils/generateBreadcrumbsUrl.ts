export default function generateBreadcrumbsUrl(docs: any, lastDoc: any) {
  let prefix = ''
  // You might want different prefixes for different collections.
  switch (lastDoc._collection) {
  }

  if (lastDoc?.isHome) {
    return '/'
  }

  const parentPaths = lastDoc?.isDynamic
    ? docs.reduce(
        (url: any, doc: any) =>
          doc?.id !== lastDoc?.id ? `${url}${doc.path ?? ''}` : url,
        prefix,
      )
    : '/'

  console.log('Parent Paths: ', parentPaths)

  const slug = lastDoc?.isDynamic ? `[${lastDoc?.slug}]` : `${lastDoc?.slug}`

  console.log('Slug: ', slug)

  const path = `${parentPaths}/${slug}`

  console.log('Path: ', path)

  return path
}
