'use server'
import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation'

import bcrypt from 'bcrypt'

import type { Role, Status } from '@prisma/client'
import { z } from 'zod'

import { UserService } from '@/app/services/user.service'

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

  console.log('p')
  console.log(role, status)

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

  const hashPassword = await bcrypt.hash(password, 13)

  const user = await UserService.createUser({
    fullName,
    username,
    email,
    password: hashPassword,
    role,
    status,
    contact
  })

  console.log(user)

  if (user) {
    // revalidatePath('/en/apps/user', 'page')
    redirect('/en/apps/user')

    return {
      status: 'success',
      message: 'User registered successfully'
    }
  } else {
    return {
      status: 'error',
      message: 'Register Error!'
    }
  }
}
