import { SiteSettingsGlobal } from '@contentql/core/blog'
import { GlobalConfig, Tab } from 'payload'

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
  fields: [
    ...SiteSettingsGlobal.fields.map(field => {
      if (field.type === 'tabs') {
        const overriddenTabs = field.tabs.map(tab => {
          if ('name' in tab && tab.name === 'themeSettings') {
            return {
              ...tab,
              fields: [
                {
                  name: 'overrideTheme',
                  type: 'checkbox',
                  required: true,
                  defaultValue: false,
                  admin: {
                    description:
                      'Check this field to enable overriding local styles with admin-panel styles',
                  },
                },
                ...tab.fields,
              ],
            } as Tab
          }

          return tab
        })

        return { ...field, tabs: overriddenTabs }
      }

      return field
    }),
  ],
}
