/**
 * Matches an input path against a Next.js style path pattern.
 * Supports dynamic segments, required catch-all, and optional catch-all routes.
 *
 * @param inputPath - The actual path (e.g., '/author/mani/test')
 * @param patternPath - The Next.js style pattern path (e.g., '/author/[authorName]/test')
 * @returns {boolean} - Returns true if the input path matches the pattern path.
 *
 * @example
 * // Static route matching
 * matchNextJsPath('/about', '/about') // true
 * matchNextJsPath('/about', '/contact') // false
 *
 * @example
 * // Dynamic segment matching
 * matchNextJsPath('/author/mani', '/author/[authorName]') // true
 * matchNextJsPath('/author/jane', '/author/[authorName]') // true
 * matchNextJsPath('/author/mani/test', '/author/[authorName]/test') // true
 * matchNextJsPath('/author', '/author/[authorName]') // false
 *
 * @example
 * // Required catch-all segment matching
 * matchNextJsPath('/docs/nextjs/getting-started', '/docs/[...slug]') // true
 * matchNextJsPath('/docs', '/docs/[...slug]') // false
 *
 * @example
 * // Optional catch-all segment matching
 * matchNextJsPath('/docs', '/docs/[[...slug]]') // true
 * matchNextJsPath('/docs/nextjs/getting-started', '/docs/[[...slug]]') // true
 */
export function matchNextJsPath(
  inputPath: string,
  patternPath: string,
): boolean {
  const inputSegments = inputPath.split('/').filter(Boolean)
  const patternSegments = patternPath.split('/').filter(Boolean)

  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i]
    const inputSegment = inputSegments[i]

    if (patternSegment.startsWith('[[...') && patternSegment.endsWith(']]')) {
      // Optional catch-all (matches zero or more segments)
      return true
    }

    if (patternSegment.startsWith('[...') && patternSegment.endsWith(']')) {
      // Required catch-all (matches one or more segments)
      return inputSegments.length >= patternSegments.length
    }

    if (patternSegment.startsWith('[') && patternSegment.endsWith(']')) {
      // Dynamic segment (matches any single segment)
      if (!inputSegment) return false
      continue
    }

    if (patternSegment !== inputSegment) {
      // Static segment (must match exactly)
      return false
    }
  }

  // Ensure all input segments are matched, or the last pattern segment is an optional catch-all
  return (
    inputSegments.length === patternSegments.length ||
    patternSegments[patternSegments.length - 1].startsWith('[[...')
  )
}
