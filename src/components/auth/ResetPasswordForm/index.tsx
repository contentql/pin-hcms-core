'use client'

import { Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/trpc/client'
import {
  GenerateTokenSchema,
  ResetPasswordSchema,
} from '@/trpc/routers/auth/validator'

// import { generateResetPasswordToken, resetPassword } from './actions'

// Form component to request a password reset token
export function GenerateResetTokenForm() {
  const form = useForm<z.infer<typeof GenerateTokenSchema>>({
    resolver: zodResolver(GenerateTokenSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const {
    mutate: generateResetPasswordTokenMutation,
    isPending: isGeneratePasswordPending,
    isError: isGeneratePasswordError,
    error: generatePasswordError,
    isSuccess: isGeneratePasswordSuccess,
  } = trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      //   toast.success('Please check you mail!')
    },
    onError: () => {
      //   toast.error('Error sending you mail, try again!')
    },
  })

  const onSubmit = async (data: z.infer<typeof GenerateTokenSchema>) => {
    generateResetPasswordTokenMutation({
      ...data,
    })
  }

  return (
    <main
      id='content'
      role='main'
      className='flex min-h-screen w-full items-center justify-center bg-black'>
      <div className='mx-auto w-full max-w-md rounded-none drop-shadow-2xl md:rounded-2xl md:p-8'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
            Forgot password?
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Remember your password?
            <a
              className='pl-1 font-medium text-indigo-600 decoration-1 hover:underline'
              href='/sign-in'>
              SignIn here
            </a>
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              {isGeneratePasswordError && (
                <p className='text-red-500'>{generatePasswordError.message}</p>
              )}
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='email'
                      className='mb-2 ml-1 block text-sm font-bold dark:text-white'>
                      Email address
                    </label>
                    {errors.email && (
                      <p
                        className='mt-2 hidden text-xs text-red-600'
                        id='email-error'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('email')}
                    type='email'
                    id='email'
                    name='email'
                    placeholder='jon@gmail.com'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isGeneratePasswordPending}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50 dark:focus:ring-offset-gray-800'>
                {isGeneratePasswordPending ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

// Form component to reset the password using the provided token
export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token, password: '' },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const {
    mutate: resetPasswordMutation,
    isPending: isResetPasswordPending,
    isError: isResetPasswordError,
    error: resetPasswordError,
    isSuccess: isResetPasswordSuccess,
  } = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      //   toast.success('Changed your password!')
      router.push('/sign-in')
    },
    onError: () => {
      //   toast.error('Not able to change your password, try again!')
    },
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPasswordMutation({
      ...data,
    })
  }

  return (
    <main className='flex h-screen w-full items-center justify-center bg-black'>
      <div className='w-full max-w-md rounded-none drop-shadow-2xl md:rounded-2xl md:p-8'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
            Almost there!
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Please enter a new password to reset.
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              {isResetPasswordError && (
                <p className='text-red-500'>{resetPasswordError.message}</p>
              )}
              {isResetPasswordSuccess && (
                <p className='text-green-500'>Updated Password ✅</p>
              )}
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='password'
                      className='mb-2 ml-1 block text-sm font-bold dark:text-white'>
                      Enter password
                    </label>
                    {errors.password && (
                      <p
                        className='mt-2 hidden text-xs text-red-600'
                        id='email-error'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('password')}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='● ● ● ● ● ● ● ●'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isResetPasswordPending}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-opacity-50 dark:focus:ring-offset-gray-800'>
                {isResetPasswordPending ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
