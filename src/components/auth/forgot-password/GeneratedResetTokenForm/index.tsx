'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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

const GenerateTokenSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

const GenerateResetTokenForm: React.FC = () => {
  const form = useForm<z.infer<typeof GenerateTokenSchema>>({
    resolver: zodResolver(GenerateTokenSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })

  const { handleSubmit, reset } = form

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof GenerateTokenSchema>) => {
      try {
        const response = await axiosConfig('/api/users/forgot-password', {
          data,
          method: 'POST',
        })

        return response.data?.message
      } catch (error) {
        console.log('Failed to generate reset-password token', { error })
        throw new Error('Failed to generate reset-password token')
      }
    },
    onSuccess: status => {
      if (status === 'Success') {
        reset()
      }
    },
  })

  const onSubmit = async (data: z.infer<typeof GenerateTokenSchema>) => {
    mutate(data)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div>
        {isSuccess ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Reset email has been sent to your email.
            </AlertDescription>
          </Alert>
        ) : isError ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>Failed to sent reset email.</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className='w-full max-w-md p-6'>
        <h1 className='text-3xl font-bold'>Forgot password?</h1>

        <div className='mt-8'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-8'>
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

                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GenerateResetTokenForm
