'use client'

import { SiteSetting } from '@payload-types'
import React, { createContext, use } from 'react'

const MetadataContext = createContext<SiteSetting | null>(null)

export const useMetadata = () => {
  const context = use(MetadataContext)
  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider')
  }
  return context
}

export const MetadataProvider = ({
  metadata,
  children,
}: {
  metadata: SiteSetting
  children: React.ReactNode
}) => {
  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  )
}
