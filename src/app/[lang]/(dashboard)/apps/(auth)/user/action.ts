'use server'
import bcrypt from 'bcrypt'
import { UserService } from '@/app/services/user.service'
import { Role, Status } from '@prisma/client'
import { z } from 'zod'

const UserSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  role: z.string().min(3),
  status: z.string().min(3)
})
export async function RegisterUserAction(prevState: unknown, formdata: FormData) {
  const fullName = formdata.get('fullName') as string
  const username = formdata.get('username') as string
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string
  const role = formdata.get('role') as Role
  const status = formdata.get('status') as Status
  const contact = Number(formdata.get('contact'))

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

  // input to db
  try {
    const hashPassword = await bcrypt.hash(password, 13)
    await UserService.createUser({ fullName, username, email, password: hashPassword, role, status, contact })

    return {
      status: 'success',
      message: 'User registered successfully'
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Register Error!'
    }
  }
}
