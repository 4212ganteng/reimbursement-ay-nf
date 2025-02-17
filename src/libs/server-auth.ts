import { cookies } from 'next/headers'

import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

interface AuthPayload extends JwtPayload {
  id: string
  fullName: string
  email: string
  avatarUrl: string
  Role: string
  status: string
  contact: string
}

export default async function serverAuth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  console.log({ token })

  if (!token) {
    return null
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload

    console.log({ payload })

    return payload
  } catch (error) {
    console.log(error)

    return null
  }
}
