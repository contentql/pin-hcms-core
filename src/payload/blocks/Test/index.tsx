'use client'

import { TestType } from '@payload-types'

export const Test = (data: TestType) => {
  return <>{data?.message}</>
}
