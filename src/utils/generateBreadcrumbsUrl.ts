import { singularize } from './singularize'

export default function generateBreadcrumbsUrl(docs: any, lastDoc: any) {
  let prefix = ''
  // You might want different prefixes for different collections.
  switch (lastDoc._collection) {
  }

  if (lastDoc?.isHome) {
    return '/'
  }

  const parentsPath = lastDoc?.isDynamic
    ? docs.reduce(
        (url: any, doc: any) =>
          doc?.id !== lastDoc?.id ? `${url}${doc.path ?? ''}` : url,
        prefix,
      )
    : ''

  const slug = lastDoc?.isDynamic ? `[${lastDoc?.slug}]` : `${lastDoc?.slug}`

  const singularizedPath = singularize(parentsPath)

  const path = `${singularizedPath}/${slug}`

  return path
}
