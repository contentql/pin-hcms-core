'use client'

import { Input, LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import { trpc } from '@/trpc/client'
import { SignUpSchema } from '@/trpc/routers/auth/validator'

export type SignUpFormData = z.infer<typeof SignUpSchema>

const SignUpForm: React.FC = () => {
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
    <div className='flex w-full items-center justify-center'>
      <div className='w-full max-w-md p-6'>
        {isSignUpSuccess ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Successfully Signed up ! Redirecting...
            </AlertDescription>
          </Alert>
        ) : isSignUpError ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>
              Sign up failed. Check the details you provided.
            </AlertDescription>
          </Alert>
        ) : null}
        <h1 className='mb-6 text-center text-3xl font-semibold text-base-content'>
          Sign Up
        </h1>
        <h1 className='mb-6 text-center text-sm font-semibold text-base-content'>
          Join to Our Community with all time access and free{' '}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <LabelInputContainer className='mb-4'>
              <div className='inline-flex justify-between'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-base-content/70'>
                  First Name
                </label>
                {errors?.firstName && (
                  <p className='text-sm text-error'>
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
                  className='block text-sm font-medium text-base-content/70'>
                  Last Name
                </label>
                {errors?.lastName && (
                  <p className='text-sm text-error'>
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
                  className='block text-sm font-medium text-base-content/70'>
                  E-Mail
                </label>
                {errors?.email && (
                  <p className='text-sm text-error'>{errors.email.message}</p>
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
                  className='block text-sm font-medium text-base-content/70'>
                  Password
                </label>
                {errors?.password && (
                  <p className='text-sm text-error'>
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
              className='w-full rounded-rounded-btn bg-primary  p-2 text-base-content transition-all duration-500 hover:bg-primary-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-opacity-50'
              disabled={isSignUpPending}>
              {isSignUpPending ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm text-base-content/70'>
          <p>
            Already have an account?{' '}
            <a href='/sign-in' className='text-base-content hover:underline'>
              SignIn here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
