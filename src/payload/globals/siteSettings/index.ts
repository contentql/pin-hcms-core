import { SiteSettingsGlobal } from '@contentql/core/blog'
import { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  ...SiteSettingsGlobal,
  hooks: {
    ...(SiteSettingsGlobal.hooks ?? {}),
    afterChange: [
      ...(SiteSettingsGlobal?.hooks?.afterChange ?? []),
      revalidateSiteSettings,
    ],
  },
}
