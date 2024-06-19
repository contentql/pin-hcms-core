'use client'

import { TestType } from '@payload-types'

export const Test = (data: TestType) => {
  return (
    <div className='flex min-h-screen items-center justify-center '>
      <h1 className='bold text-2xl text-white'>{data?.message}</h1>
    </div>
  )
}
