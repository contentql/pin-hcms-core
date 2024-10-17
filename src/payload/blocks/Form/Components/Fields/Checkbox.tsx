import Width from '../Width'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Checkbox } from '@/components/common/Checkbox'

interface CheckboxField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'checkbox'
}
const CheckboxField: React.FC<
  CheckboxField & {
    register: UseFormRegister<FieldValues & any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({
  name,
  defaultValue,
  label,
  width,
  register,
  required: requiredFromProps,
  errors,
}) => {
  console.log('default value', defaultValue)
  return (
    <Width width={width as number}>
      <div className='flex flex-row items-start gap-2 text-start'>
        <Checkbox
          {...register(name, { required: requiredFromProps as boolean })}
          defaultChecked={defaultValue!}
        />
        <label className='text-md font-semibold capitalize text-neutral-content/60'>
          {label}
        </label>
      </div>
      {requiredFromProps && errors[name] && (
        <p className=' text-md mt-2 text-red-500'>
          {errors[name]?.type as any}
        </p>
      )}
    </Width>
  )
}
export default CheckboxField
