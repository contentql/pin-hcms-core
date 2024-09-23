import { z } from 'zod'

export const UpdateProfileImageSchema = z.object({
  avatar: z.string(),
})

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  confirmPassword: z.string().min(6).optional(),
})
