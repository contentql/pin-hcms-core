import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  return (
    <MetadataProvider metadata={metadata}>
      <div className='grid min-h-screen w-full grid-rows-[1fr_auto]'>
        <Navbar metadata={metadata} />
        <main className='container my-20'>{children}</main>
        <Footer metadata={metadata} />
        <Branding />
      </div>
    </MetadataProvider>
  )
}

export default MarketingLayout
