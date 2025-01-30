'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@payload-types'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

const SignInForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, reset } = form

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: async ({ email, password }: z.infer<typeof SignInSchema>) => {
      try {
        const response = await axiosConfig('/api/users/login', {
          data: {
            email,
            password,
          },
          method: 'POST',
        })

        return response?.data?.user as User
      } catch (error) {
        console.log('Failed to login', { error })
        throw new Error('Failed to login')
      }
    },
    onSuccess: user => {
      console.log({ user })

      const userRole = user?.role ?? []

      if (userRole.includes('admin')) {
        router.push('/admin')
      } else if (userRole.includes('user')) {
        router.push('/profile')
      }

      reset()
    },
  })

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    mutate({
      ...data,
    })
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='mx-auto w-full max-w-md  drop-shadow-2xl'>
        <div className='w-full max-w-md p-6'>
          {isSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                Successfully logged in! Redirecting...
              </AlertDescription>
            </Alert>
          ) : isError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                Sign in failed. Check the details you provided are incorrect.
              </AlertDescription>
            </Alert>
          ) : null}

          <h1 className='mb-6 text-3xl font-semibold'>Sign In</h1>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name={'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isSuccess}
                        {...field}
                        placeholder='john.doe@example.com'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name={'password'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <Input
                          disabled={isSuccess}
                          {...field}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className='text-sm text-muted-foreground'>
                  Forgot your password?{' '}
                  <Link
                    className='text-primary underline'
                    href='/forgot-password'>
                    Reset it.
                  </Link>
                </p>
              </div>

              <Button
                className='w-full'
                type='submit'
                disabled={isPending || isSuccess}>
                {isPending ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm text-muted-foreground'>
            <p>
              Don&apos;t have an account?{' '}
              <Link href='/sign-up' className='text-primary underline'>
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
