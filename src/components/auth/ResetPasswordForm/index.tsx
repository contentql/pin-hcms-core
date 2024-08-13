'use client'

import { Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
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
      className='bg-base-100 flex min-h-screen w-full items-center justify-center'>
      <div className='mx-auto w-full max-w-md drop-shadow-2xl  md:p-8'>
        <div className='text-center'>
          {isGeneratePasswordSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                An email verification has been successfully sent.
              </AlertDescription>
            </Alert>
          ) : isGeneratePasswordError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                {generatePasswordError.message}
              </AlertDescription>
            </Alert>
          ) : null}
          <h1 className='text-base-content block text-2xl font-bold'>
            Forgot password?
          </h1>
          <p className='text-base-content/70 mt-2 text-sm'>
            Remember your password?
            <a
              className='text-base-content pl-1 font-medium decoration-1 hover:underline'
              href='/sign-in'>
              SignIn here
            </a>
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='email'
                      className='text-base-content/70 mb-2 ml-1 block text-sm font-bold'>
                      Email address
                    </label>
                    {errors.email && (
                      <p
                        className='text-error mt-2 hidden text-xs'
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
                className='bg-primary text-base-content hover:bg-primary-focus rounded-rounded-btn mt-3 inline-flex w-full items-center justify-center gap-2 border border-transparent px-4 py-3 text-sm font-semibold transition-all  disabled:cursor-not-allowed disabled:bg-opacity-50 '>
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
    <main className='bg-base-100 flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-md  drop-shadow-2xl'>
        <div className='text-center'>
          {isResetPasswordSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>Updated Password ✅</AlertDescription>
            </Alert>
          ) : isResetPasswordError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>{resetPasswordError.message}</AlertDescription>
            </Alert>
          ) : null}
          <h1 className='text-base-content block text-2xl font-bold'>
            Almost there!
          </h1>
          <p className='text-base-content/70 mt-2 text-sm'>
            Please enter a new password to reset.
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='password'
                      className='text-base-content/70 mb-2 ml-1 block text-sm font-bold'>
                      Enter password
                    </label>
                    {errors.password && (
                      <p
                        className='text-error mt-2 hidden text-xs'
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
                className='rounded-rounded-btn bg-primary text-primary-content hover:bg-primary-focus mt-3 inline-flex w-full items-center justify-center gap-2 border border-transparent px-4 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:bg-opacity-50 '>
                {isResetPasswordPending ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
