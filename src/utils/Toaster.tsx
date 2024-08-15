'use client'

import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { Toaster } from 'sonner'

/**
 * Configuration options for toasts, including custom class names for different toast types.
 */
export const toastOptions = {
  classNames: {
    title: 'text-base-content',
    error: 'bg-red-300',
    success: 'bg-green-300',
  },
}

/**
 * Custom icons used for different types of toasts.
 */
export const icons = {
  success: (
    <div>
      <TiTick
        size={16}
        className='rounded-full bg-green-300 text-sm text-base-100'
      />
    </div>
  ),

  error: (
    <div>
      <IoIosCloseCircle
        size={16}
        className='text-error-content rounded-full bg-red-300 text-sm'
      />
    </div>
  ),
}

/**
 * A component that provides toast notifications with custom icons and options.
 *
 * @returns {React.FC} - The rendered `Toaster` component from the `sonner` library with custom configurations.
 *
 * @example
 * ```
 * <ToastProvider />
 * // This will render the `Toaster` with custom icons and toast options.
 * ```
 */
const ToastProvider: React.FC = () => {
  return (
    <>
      <Toaster icons={icons} toastOptions={toastOptions} richColors />
    </>
  )
}

export default ToastProvider
