import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/(app)/globals.css'
import '@/app/(app)/theme.scss'
import Provider from '@/trpc/Provider'
import ToastProvider from '@/utils/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${inter.className}`}>
        <Provider>{children}</Provider>
        <ToastProvider />
      </body>
    </html>
  )
}
