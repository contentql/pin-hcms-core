import { Field } from 'payload'

export type SlugFieldProps = (
  fieldToUse?: string,
  overrides?: Partial<Field>,
) => Field

export type FormatStringProps = {
  value: string
  options?: {
    trim?: boolean
  }
}

export type FormatStringResult = string
