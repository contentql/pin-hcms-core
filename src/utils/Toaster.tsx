'use client'

import { IoIosCloseCircle } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { Toaster } from 'sonner'

export const toastOptions = {
  classNames: {
    title: 'text-base-content',
    error: 'bg-red-300',
    success: 'bg-green-300',
  },
}

export const icons = {
  success: (
    <div>
      <TiTick
        size={16}
        className='text-base-100 rounded-full bg-green-300 text-sm'
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

export default function ToastProvider() {
  return (
    <>
      <Toaster icons={icons} toastOptions={toastOptions} richColors />
    </>
  )
}
