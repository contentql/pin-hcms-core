'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { User } from 'payload'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosConfig from '@/utils/axiosConfig'

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  token: z.string(),
})

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token: token ?? '', password: '' },
  })

  const { handleSubmit } = form

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof ResetPasswordSchema>) => {
      try {
        const response = await axiosConfig('/api/users/reset-password', {
          data,
          method: 'POST',
        })

        return response.data?.user as User
      } catch (error) {
        console.log('Failed to generate reset-password', { error })
        throw new Error('Failed to generate reset-password')
      }
    },
    onSuccess: user => {
      if (user) {
        router.push('/sign-in')
      }
    },
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    mutate(data)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div>
        {isSuccess ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Successfully updated password, redirecting to sign-in page
            </AlertDescription>
          </Alert>
        ) : isError ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>Failed to reset password</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className='w-full max-w-md p-6'>
        <h1 className='text-3xl font-bold'>Enter new password</h1>

        <div className='mt-10'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Processing...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
