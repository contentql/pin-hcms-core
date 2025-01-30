'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@payload-types'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { GoCheckCircleFill } from 'react-icons/go'
import slugify from 'slugify'
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

import { SignUpFormData, SignUpFormSchema } from './validator'

const SignUpForm: React.FC = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { handleSubmit } = form

  const { mutate, isError, isSuccess, isPending, data } = useMutation({
    mutationFn: async (data: z.infer<typeof SignUpFormSchema>) => {
      const { confirmPassword, ...userData } = data

      try {
        const response = await axiosConfig('/api/users', {
          data: userData,
          method: 'POST',
        })

        return response.data?.doc as User
      } catch (error) {
        console.log('Failed to sign-up', { error })
        throw new Error('Failed to sign-up')
      }
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    mutate(data)
  }

  return (
    <div className='flex w-full items-center justify-center'>
      {data ? (
        <>
          <div className='mx-auto  text-center'>
            <div className='bg-base-200 mx-auto flex w-fit gap-4 rounded-md p-4'>
              <GoCheckCircleFill className='text-cq-success size-6 shrink-0 items-start' />
              <div className='text-left font-semibold'>
                Email has been sent to{' '}
                <code className='bg-cq-background rounded-sm px-2 py-1'>
                  {data.email}
                </code>
                <span className='text-cq-text-secondary mt-1 block font-normal'>
                  You can close this window now.
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full max-w-md p-6'>
          {isSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                Successfully signed up ! please verify your email
              </AlertDescription>
            </Alert>
          ) : isError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                Sign up failed. Check the details you provided.
              </AlertDescription>
            </Alert>
          ) : null}
          <h1 className='mb-6 text-3xl font-semibold'>Sign Up</h1>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name={'username'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        onChange={e => {
                          field.onChange(
                            slugify(e.target.value, {
                              remove: /[*+~.()'"!:@]/g,
                              lower: true,
                              strict: true,
                              locale: 'en',
                              trim: false,
                            }),
                          )
                        }}
                        placeholder='john-deo'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='johndeo@gmail.com'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name={'confirmPassword'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </Form>

          <div className='text-base-content/70 mt-4 text-center text-sm'>
            <p>
              Already have an account?{' '}
              <Link href='/sign-in' className='text-primary underline'>
                SignIn
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUpForm
