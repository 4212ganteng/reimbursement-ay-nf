'use server'

import { z } from 'zod'

const UserSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  role: z.string().min(3),
  status: z.string().min(3),
  contact: z.number().min(3)
})
export async function RegisterUserAction(prevState: unknown, formdata: FormData) {
  const fullName = formdata.get('fullName')
  const username = formdata.get('username')
  const email = formdata.get('email')
  const password = formdata.get('password')
  const role = formdata.get('role')
  const status = formdata.get('status')
  const contact = formdata.get('contact')

  const inputValidation = UserSchema.safeParse({ fullName, username, email, password, role, status, contact })

  if (!inputValidation.success) {
    return {
      status: 'error',
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        fullName,
        username,
        email,
        password,
        role,
        status,
        contact
      }
    }
  }

  return {
    status: 'success',
    message: 'user registered successfully'
  }
}
