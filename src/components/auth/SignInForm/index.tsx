'use client'

import { BottomGradient, Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ComponentProps, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { z } from 'zod'

import { signInWithCredentials } from './actions'

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail is required' })
    .email({ message: 'E-mail is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

const Separator = ({ children }: ComponentProps<'div'>) => (
  <div className='relative isolate my-3 flex items-center justify-center'>
    <p className='bg-white p-2 text-sm font-medium uppercase text-zinc-500 dark:bg-zinc-900'>
      {children}
    </p>
    <hr className='absolute z-[-1] w-full border-0 bg-zinc-200 p-px dark:bg-zinc-600' />
  </div>
)

const SignInForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [backendLoginResponse, setBackendLoginResponse] = useState<Awaited<
    ReturnType<typeof signInWithCredentials>
  > | null>(null)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form

  const [email, password] = watch(['email', 'password'])

  useEffect(() => {
    if (backendLoginResponse && backendLoginResponse.success === false) {
      setBackendLoginResponse(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    startTransition(() => {
      signInWithCredentials({ ...data, redirectTo: '/' }).then(result => {
        if (!result) return
        if (result.success === true) {
          router.push('/')
        }
        if ('error' in result) {
          setBackendLoginResponse(result)
        }
      })
    })
  }

  return (
    <div className='flex min-h-screen bg-black'>
      <div className='flex w-full items-center justify-center'>
        <div className='mx-auto w-full max-w-md rounded-none drop-shadow-2xl md:rounded-2xl md:p-8'>
          <div className='w-full max-w-md p-6'>
            {backendLoginResponse && 'error' in backendLoginResponse ? (
              <p className='text-center text-red-500'>
                {backendLoginResponse?.error?.code === 'credentials' &&
                  'Sign in failed. Check the details you provided are incorrect.'}
              </p>
            ) : null}
            {backendLoginResponse && backendLoginResponse?.success === true ? (
              <p className='text-center text-green-500'>
                Successfully logged in! Redirecting...
              </p>
            ) : null}
            <h1 className='mb-6 text-center text-3xl font-semibold text-white'>
              Sign In
            </h1>
            <h1 className='mb-6 text-center text-sm font-semibold text-gray-300'>
              Join to Our Community with all time access and free{' '}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-300'>
                      E-Mail
                    </label>
                    {errors?.email && (
                      <p className='text-sm text-red-500'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('email')}
                    type='text'
                    id='email'
                    name='email'
                    placeholder='john.doe@example.com'
                  />
                </LabelInputContainer>
              </div>
              <div>
                <LabelInputContainer className='mb-8'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-300'>
                      Password
                    </label>
                    {errors?.password && (
                      <p className='text-sm text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('password')}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='● ● ● ● ● ● ● ● ●'
                  />
                </LabelInputContainer>
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Forgot your password?{' '}
                <Link className='underline' href='/reset-password'>
                  Reset it.
                </Link>
              </p>
              <div>
                <button
                  type='submit'
                  className='w-full rounded-md border-[1px] border-indigo-600 bg-indigo-600 p-2 text-white transition-all duration-500 hover:bg-indigo-700  focus:outline-none focus:ring-1 focus:ring-gray-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-opacity-50'
                  disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>
            <div className='mt-4 flex flex-col space-y-4'>
              <button
                className=' group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
                type='submit'>
                <FaGithub className='text-neutral-800 dark:text-neutral-300 h-4 w-4' />
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className=' group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
                type='submit'>
                <FaGithub className='text-neutral-800 dark:text-neutral-300 h-4 w-4' />
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  Google
                </span>
                <BottomGradient />
              </button>
            </div>
            <div className='mt-4 text-center text-sm text-gray-300'>
              <p>
                Don&apos;t have an account?{' '}
                <a href='/sign-up' className='text-white hover:underline'>
                  SignUp here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
