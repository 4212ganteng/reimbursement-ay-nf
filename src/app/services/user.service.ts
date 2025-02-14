import { prisma } from '@/utils/prisma'
import { User } from '@prisma/client'

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
  }
}
