'use client'

import { Input, LabelInputContainer } from '../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/trpc/client'
import { SignUpSchema } from '@/trpc/routers/auth/validator'

export type SignUpFormData = z.infer<typeof SignUpSchema>

const SignUpForm = () => {
  const router = useRouter()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  const {
    mutate: signUpMutation,
    isPending: isSignUpPending,
    isError: isSignUpError,
    error: signUpError,
    isSuccess: isSignUpSuccess,
  } = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success('Account created! Redirecting to profile page.')
      reset()
      router.push('/profile')
    },
    onError: () => {
      toast.error('Unable to create an account, try again!')
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    signUpMutation({
      ...data,
    })
  }

  return (
    <div className='flex min-h-screen bg-black'>
      <div className='flex w-full items-center justify-center'>
        <div className='w-full max-w-md p-6'>
          <h1 className='mb-6 text-center text-3xl font-semibold text-white'>
            Sign Up
          </h1>
          <h1 className='mb-6 text-center text-sm font-semibold text-gray-300'>
            Join to Our Community with all time access and free{' '}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-300'>
                    First Name
                  </label>
                  {errors?.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('firstName')}
                  type='text'
                  id='firstName'
                  name='firstName'
                  placeholder='John'
                />
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-300'>
                    Last Name
                  </label>
                  {errors?.lastName && (
                    <p className='text-sm text-red-500'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('lastName')}
                  type='text'
                  id='lastName'
                  name='lastName'
                  placeholder='Doe'
                />
              </LabelInputContainer>
            </div>

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
            <div>
              <button
                type='submit'
                className='w-full rounded-md border-[1px] border-indigo-600 bg-indigo-600 p-2 text-white transition-all duration-500 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-opacity-50'
                disabled={isSignUpPending}>
                {isSignUpPending ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm text-gray-300'>
            <p>
              Already have an account?{' '}
              <a href='/sign-in' className='text-white hover:underline'>
                SignIn here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
