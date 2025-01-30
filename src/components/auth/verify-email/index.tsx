'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import axiosConfig from '@/utils/axiosConfig'

const EmailVerificationView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { isPending, isSuccess, isError } = useQuery({
    queryFn: async () => {
      try {
        const response = await axiosConfig(`/api/users/verify/${token}`, {
          method: 'POST',
        })

        return response?.data
      } catch (error) {
        throw new Error('')
      }
    },
    queryKey: [`reset-password-${token}`],
    enabled: !!token,
  })

  if (isSuccess) {
    toast.success(`Your email successfully verified`)
    router.push('/sign-in')
  }

  if (!token) {
    router.push('/sign-in')
  }

  return (
    <div className='flex min-h-screen items-center justify-center gap-x-2'>
      {isPending ? (
        <p>
          <Loader size={20} className='mr-3 inline-block animate-spin' />
          Please wait! email verification in progress...
        </p>
      ) : null}

      {isError ? (
        <p>
          Failed to verify email, the link might be expired. Please request new
          link or contact support for help
        </p>
      ) : null}
    </div>
  )
}

export default EmailVerificationView
