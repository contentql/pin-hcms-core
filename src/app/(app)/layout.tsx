import {
  borderRadius,
  fontType,
  getCSSAndLinkGoogleFonts,
  hexToHsl,
  mimeTypes,
} from '@contentql/core'
import { env } from '@env'
import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import type { Metadata, Viewport } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { Fragment } from 'react'
import { Toaster } from 'sonner'

import '@/app/(app)/globals.css'
import GoogleAdsense from '@/components/GoogleAdsense'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Provider from '@/trpc/Provider'

const getCachedSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
    })

    return data
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export async function generateMetadata(): Promise<Metadata> {
  try {
    // calling the site-settings to get all the data
    const metadata = await getCachedSiteSettings()
    const generalSettings = metadata?.general

    const ogImageUrl =
      typeof generalSettings?.ogImageUrl === 'object'
        ? generalSettings?.ogImageUrl?.url!
        : '/images/seed/og-image.png'

    const title = {
      default: generalSettings?.title,
      template: `%s | ${generalSettings?.title}`,
    }

    const description = generalSettings?.description
    const ogImage = [
      {
        url: `${ogImageUrl}`,
        height: 630,
        width: 1200,
        alt: `og image`,
      },
    ]

    return {
      title,
      description,
      // we're appending the http|https int the env variable
      metadataBase: env.PAYLOAD_URL as unknown as URL,
      openGraph: {
        title,
        description,
        images: ogImage,
      },
      twitter: {
        title,
        description,
        images: ogImage,
      },
      keywords: generalSettings?.keywords,
    }
  } catch (error) {
    // in error case returning a base metadata object
    console.log({ error })

    return {
      title: 'Create CQL App',
      description: 'Generated by create cql app',
    }
  }
}

export const viewport: Viewport = {
  themeColor: 'dark',
  initialScale: 1,
}

type ThemeStylesType = {
  colors: SiteSetting['themeSettings']['lightMode']
  fontName: {
    display: string
    body: string
  }
  radius: SiteSetting['themeSettings']['radius']
}

function generateThemeVariables({ colors, radius, fontName }: ThemeStylesType) {
  return `
      --primary: ${hexToHsl(colors.primary)};
      --primary-foreground: ${hexToHsl(colors.primaryForeground)};
      --secondary: ${hexToHsl(colors.secondary)};
      --secondary-foreground: ${hexToHsl(colors.secondaryForeground)};
      --accent: ${hexToHsl(colors.accent)};
      --accent-foreground: ${hexToHsl(colors.accentForeground)};
      --background: ${hexToHsl(colors.background)};
      --foreground: ${hexToHsl(colors.foreground)};
      --card: ${hexToHsl(colors.card)};
      --card-foreground: ${hexToHsl(colors.cardForeground)};
      --popover: ${hexToHsl(colors.popover)};
      --popover-foreground: ${hexToHsl(colors.popoverForeground)};
      --muted: ${hexToHsl(colors.muted)};
      --muted-foreground: ${hexToHsl(colors.mutedForeground)};
      --destructive: ${hexToHsl(colors.destructive)};
      --border: ${hexToHsl(colors.border)};
      --input: ${hexToHsl(colors.input)};
      --ring: ${hexToHsl(colors.ring)};
      --font-display: ${fontName.display || ''};
      --font-body: ${fontName.body || ''};
      --border-radius: ${borderRadius[radius]}rem;
  `
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const metadata = await getCachedSiteSettings()
  const { general, themeSettings } = metadata
  const { lightMode, darkMode, fonts, radius, overrideTheme } = themeSettings

  const faviconUrl =
    typeof general?.faviconUrl === 'object'
      ? general?.faviconUrl?.url!
      : '/favicon.ico'

  const displayFont =
    fonts.display.type === 'customFont'
      ? typeof fonts.display.customFont === 'object'
        ? {
            url: fonts.display.customFont?.url ?? '',
            format:
              mimeTypes[
                ((fonts.display?.customFont?.url ?? '').split('.')?.[1] ??
                  'otf') as keyof typeof mimeTypes
              ],
            fontName: 'Display',
          }
        : undefined
      : {
          googleFontURL: fonts.display.remoteFont ?? '',
          fontName: fonts.display.fontName ?? '',
        }

  const bodyFont =
    fonts.body.type === 'customFont'
      ? typeof fonts.body.customFont === 'object'
        ? {
            url: fonts.body.customFont?.url ?? '',
            format:
              mimeTypes[
                ((fonts.body?.customFont?.url ?? '').split('.')?.[1] ??
                  'otf') as keyof typeof mimeTypes
              ],
            fontName: 'Body',
          }
        : undefined
      : {
          googleFontURL: fonts.body.remoteFont ?? '',
          fontName: fonts.body.fontName ?? '',
        }

  const googleFontsList = [
    displayFont?.googleFontURL ?? '',
    bodyFont?.googleFontURL ?? '',
  ].filter(url => Boolean(url))

  const response = await getCSSAndLinkGoogleFonts({
    fontUrlList: googleFontsList,
  })

  // All the color variables are generated using generateThemeStyles function for light & dark mode
  const lightModeVariables = generateThemeVariables({
    colors: lightMode,
    fontName: {
      display: displayFont?.fontName ?? '',
      body: bodyFont?.fontName ?? '',
    },
    radius,
  })

  const darkModeVariables = generateThemeVariables({
    colors: darkMode,
    fontName: {
      display: displayFont?.fontName ?? '',
      body: bodyFont?.fontName ?? '',
    },
    radius,
  })

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' type='image/x-icon' href={faviconUrl} />
        {/* Preloading the custom font given by the user */}
        {displayFont?.url && (
          <link
            rel='preload'
            href={`${env.PAYLOAD_URL}${displayFont.url}`}
            as='font'
            type={displayFont.format}
            crossOrigin='anonymous'
          />
        )}

        {bodyFont?.url && (
          <link
            rel='preload'
            href={`${env.PAYLOAD_URL}${bodyFont.url}`}
            as='font'
            type={bodyFont.format}
            crossOrigin='anonymous'
          />
        )}

        {/* If user uploads custom font setting styles of that font */}
        <style
          dangerouslySetInnerHTML={{
            __html: `${
              displayFont?.url
                ? `@font-face {
            font-family: 'Display';
            src: url(${env.PAYLOAD_URL}${displayFont.url}) format(${fontType[displayFont.format]});
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }`
                : ''
            }\n
            ${
              bodyFont?.url
                ? `@font-face {
            font-family: 'Body';
            src: url(${env.PAYLOAD_URL}${bodyFont.url}) format(${fontType[bodyFont.format]});
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }`
                : ''
            }`,
          }}
        />

        {/* Link & Style tags are created from googleFonts response */}
        {response.map(({ cssText, preloadLinks }, index) => (
          <Fragment key={index}>
            {preloadLinks.map(({ href, type }) =>
              href ? (
                <link
                  rel='preload'
                  as='font'
                  crossOrigin='anonymous'
                  href={href}
                  type={type}
                  key={href}
                />
              ) : null,
            )}
            <style dangerouslySetInnerHTML={{ __html: cssText }} />
          </Fragment>
        ))}

        {/* following shadcn approach & generating lightMode & darkMode variables */}
        {/* Enabled a boolean to enable local css variable overridden from admin-panel */}
        {overrideTheme ? (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            :root {
            ${lightModeVariables}
            }
            \n
              .dark {
                ${darkModeVariables}
              }
            `,
            }}
          />
        ) : null}

        <GoogleAdsense metadata={metadata} />
        <GoogleAnalytics metadata={metadata} />
      </head>

      <body className='antialiased'>
        <Provider>{children}</Provider>

        {/* Sonnar toast library */}
        <Toaster richColors theme='dark' />
      </body>
    </html>
  )
}
