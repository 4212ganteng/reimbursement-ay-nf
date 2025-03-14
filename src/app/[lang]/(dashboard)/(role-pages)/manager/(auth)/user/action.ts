'use server'

import { redirect } from 'next/navigation'

import bcrypt from 'bcryptjs'

import type { Role, Status } from '@prisma/client'
import { z } from 'zod'

import { UserService } from '@/app/services/user.service'
import { uploadFile } from '@/utils/aws'

const UserSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  role: z.string().min(3),
  status: z.string().min(3),
  avatarUrl: z.instanceof(File)
})

export async function RegisterUserAction(prevState: unknown, formdata: FormData) {
  const fullName = formdata.get('fullName') as string
  const username = formdata.get('username') as string
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string
  const role = formdata.get('role') as Role
  const status = formdata.get('status') as Status
  const avatarUrl = formdata.get('avatarUrl') as string | null
  const contact = Number(formdata.get('contact'))

  console.log('p')
  console.log({ avatarUrl })

  const inputValidation = UserSchema.safeParse({
    fullName,
    username,
    email,
    password,
    role,
    status,
    contact,
    avatarUrl
  })

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

  // check unique email
  const isRegistered = await UserService.findUser(email)

  if (isRegistered) {
    return {
      status: 'error',
      message: 'Email already exist'
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
    avatarUrl,
    contact
  })

  if (!user) {
    return {
      success: false,
      message: 'Error creating user'
    }
  }

  if (!user.avatarUrl) {
    console.log('gak upload file harus nya ')
  }

  // Process file uploads if any
  const upFile = await uploadFile({
    key: user.avatarUrl || '/images/avatars/1.png',
    body: inputValidation.data.avatarUrl,
    folder: `users/${user.id}`
  })

  if (!(user && upFile)) {
    console.log('error cuy')

    return {
      success: false,
      message: 'Register Error!',
      data: 'Unknown error occurred'
    }
  }

  redirect('/en/manager/user')
}
