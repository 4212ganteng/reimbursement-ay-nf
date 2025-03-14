import type { Reimbursement } from '@prisma/client'

import { prisma } from '@/utils/prisma'

export const reimbursementService = {
  createReimbursement: async (
    reimbust: Pick<Reimbursement, 'userId' | 'description' | 'price' | 'invoiceImage' | 'status' | 'date'>
  ) => {
    const newReimbursement = await prisma.reimbursement.create({
      data: {
        userId: reimbust.userId,
        description: reimbust.description,
        price: reimbust.price,
        invoiceImage: reimbust.invoiceImage,
        date: reimbust.date,
        status: 'PENDING'
      }
    })

    return newReimbursement
  },

  getAllReimbustmen: async () => {
    const data = await prisma.reimbursement.findMany({
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
            contact: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  },
  getAllReimbustmenByUser: async (id: string) => {
    const data = await prisma.reimbursement.findMany({
      where: {
        userId: id
      },
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
            contact: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  },

  getRejectedReimbustmen: async () => {
    const data = await prisma.reimbursement.findMany({
      where: {
        status: 'REJECTED'
      },
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
            contact: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  },
  getApprovedReimbustmen: async () => {
    const data = await prisma.reimbursement.findMany({
      where: {
        status: 'APPROVED'
      },
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
            contact: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  },
  getPendingReimbustmen: async () => {
    const data = await prisma.reimbursement.findMany({
      where: {
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
            contact: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return data
  },

  rejectReimbursement: async (idOrSlug: string) => {
    console.log({ idOrSlug })

    const rejected = await prisma.reimbursement.update({
      where: {
        id: idOrSlug
      },
      data: {
        status: 'REJECTED'
      }
    })

    console.log({ rejected })

    return rejected
  },
  approveReimbursement: async (idOrSlug: string) => {
    console.log('aw, im hitted')
    console.log({ idOrSlug })

    const approved = await prisma.reimbursement.update({
      where: {
        id: idOrSlug
      },
      data: {
        status: 'APPROVED'
      }
    })

    console.log({ approved })

    return approved
  }
}
