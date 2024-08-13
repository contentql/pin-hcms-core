'use client'

import { useField } from '@payloadcms/ui'
import React from 'react'

const CustomTextField: React.FC<{ path: string }> = () => {
  const { value, setValue, path } = useField({})
  console.log(value)
  console.log(path)

  return <>mani</>
}

export default CustomTextField
