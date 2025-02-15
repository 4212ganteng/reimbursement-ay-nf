import type { User } from '@prisma/client'

import { prisma } from '@/utils/prisma'

export const UserService = {
  createUser: async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newUser = await prisma.user.create({
      data: {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        contact: user.contact,
        status: user.status
      }
    })

    return newUser
  },

  findUser: async (idOrEmail: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrEmail
          },
          {
            email: idOrEmail
          }
        ]
      }
    })

    return user
  }
}
