'use client'

import { DateTimeField, useFormFields, useFormModified } from '@payloadcms/ui'
import { DateFieldProps } from 'payload'

const CustomPublishOnField: React.FC<DateFieldProps> = props => {
  const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({
    fields,
    dispatch,
  }))
  const isFormModified = useFormModified()

  const status = fields?._status?.value
  const publishOn = fields?.publishOn?.value

  return (
    <DateTimeField
      {...props}
      readOnly={Boolean(publishOn) && status === 'published' && !isFormModified}
    />
  )
}

export default CustomPublishOnField
