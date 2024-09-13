'use client'

import { env } from '@env'
import { Blog } from '@payload-types'
import { DiscussionEmbed } from 'disqus-react'

const Comments = ({ page }: { page: Blog }) => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const disqusConfig = {
    url: pageUrl,
    identifier: page?.slug as string,
    title: page?.title as string,
  }
  return (
    <DiscussionEmbed shortname={env.DISQUS_SHORTNAME} config={disqusConfig} />
  )
}

export default Comments
