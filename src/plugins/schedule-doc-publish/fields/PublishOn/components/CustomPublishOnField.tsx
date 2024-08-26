'use client'

import { DateTimeField, useFormFields, useFormModified } from '@payloadcms/ui'
import { DateFieldProps } from 'payload'
import React, { useEffect, useState } from 'react'

const CustomPublishOnField: React.FC<DateFieldProps> = props => {
  const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({
    fields,
    dispatch,
  }))
  const isFormModified = useFormModified()

  const status = fields?._status?.value
  const publishOn = fields?.publishOn?.value

  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)

  useEffect(() => {
    if (publishOn && status !== 'published') {
      const targetDate = new Date(String(publishOn)).getTime()

      const updateTimeRemaining = () => {
        const now = new Date().getTime()
        const timeDifference = targetDate - now

        if (timeDifference <= 0) {
          setTimeRemaining('Published')
        } else {
          const hours = Math.floor(
            (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600),
          )
          const minutes = Math.floor(
            (timeDifference % (1000 * 3600)) / (1000 * 60),
          )
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
        }
      }

      updateTimeRemaining()
      const interval = setInterval(updateTimeRemaining, 1000)

      return () => clearInterval(interval)
    } else {
      setTimeRemaining(null)
    }
  }, [publishOn, status])

  return (
    <div>
      <DateTimeField
        {...props}
        readOnly={
          Boolean(publishOn) && status === 'published' && !isFormModified
        }
      />
      {timeRemaining && (
        <div className='time-remaining' style={{ paddingTop: '3px' }}>
          Time Remaining: {timeRemaining}
        </div>
      )}
    </div>
  )
}

export default CustomPublishOnField
