import { Metadata } from 'next'

import EmailVerificationView from '@/components/auth/verify-email'
import withNoAuth from '@/utils/withNoAuth'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const metadata: Metadata = {
  title: 'Email verification',
  description: 'This is a verify page',
}

const VerifyEmail = ({ searchParams }: PageProps) => {
  return <EmailVerificationView searchParams={searchParams} />
}

export default withNoAuth(VerifyEmail)
