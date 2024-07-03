'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'
import { FaGithub } from 'react-icons/fa'

import { cn } from '@/utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100 // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false)

    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='group/input rounded-lg p-[2px] transition duration-300'>
        <input
          type={type}
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black  transition file:border-0 
          file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 disabled:cursor-not-allowed
           disabled:opacity-50 group-hover/input:shadow-none
           dark:bg-zinc-800
           dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600
           `,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
  }
  return (
    <div className='shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8'>
      <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
        Welcome to ContentQL
      </h2>
      <form className='my-8' onSubmit={handleSubmit}>
        <LabelInputContainer className='mb-4'>
          <p>Email Address</p>
          <Input id='email' placeholder='projectmayhem@fc.com' type='email' />
        </LabelInputContainer>
        <LabelInputContainer className='mb-4'>
          <p>Password</p>
          <Input id='password' placeholder='••••••••' type='password' />
        </LabelInputContainer>
        <LabelInputContainer className='mb-8'>
          <p>Your twitter password</p>
          <Input
            id='twitterpassword'
            placeholder='••••••••'
            type='twitterpassword'
          />
        </LabelInputContainer>

        <button
          className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          type='submit'>
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

        <div className='flex flex-col space-y-4'>
          <button
            className=' group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            <FaGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300'>
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=' group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            <FaGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300'>
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=' group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            <FaGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
            <span className='text-sm text-neutral-700 dark:text-neutral-300'>
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  )
}

export const BottomGradient = () => {
  return (
    <>
      <span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
      <span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
    </>
  )
}

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  )
}
