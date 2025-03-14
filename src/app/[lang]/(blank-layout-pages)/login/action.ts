'use server'

import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { UserService } from '@/app/services/user.service'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
})

export async function LoginAction(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const inputValidation = loginSchema.safeParse({ email, password })

  if (!inputValidation.success) {
    return {
      status: 'error',
      errors: inputValidation.error.flatten().fieldErrors,
      data: {
        email,
        password
      }
    }
  }

  // check user
  const user = await UserService.findUser(email)

  if (!user) {
    return {
      status: 'error',
      message: 'User not found',
      data: {
        email,
        password
      }
    }
  }

  // check password
  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    return {
      status: 'error',
      message: 'invalid password',
      data: {
        email,
        password
      }
    }
  }

  // generate jwt token
  const payload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    avatarUrl: user.avatarUrl,
    Role: user.role,
    status: user.status,
    contact: user.contact
  }

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)

  // set cookies
  const cookieStore = await cookies()

  cookieStore.set('token', jwtToken, {
    httpOnly: true,
    path: '/'
  })

  return {
    success: true,
    message: 'Welcome Back!',
    data: payload
  }
}

export async function LogoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete('token')

  redirect('/login')
}
