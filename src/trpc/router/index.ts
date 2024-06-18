import { router } from '@/trpc'
import { authorRouter } from '@/trpc/router/author'
import { blogRouter } from '@/trpc/router/blog'
import { pageRouter } from '@/trpc/router/page'
import { siteSettingsRouter } from '@/trpc/router/site-settings'
import { tagRouter } from '@/trpc/router/tag'

export const appRouter = router({
  page: pageRouter,
  blog: blogRouter,
  siteSettings: siteSettingsRouter,
  tag: tagRouter,
  author: authorRouter,
})

export type AppRouter = typeof appRouter
