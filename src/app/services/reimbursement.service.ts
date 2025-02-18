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

  rejectReimbursement: async (idOrSlug: string) => {
    const rejectedReimbursement = await prisma.reimbursement.update({
      where: {
        id: idOrSlug
      },
      data: {
        status: 'REJECTED'
      }
    })

    return rejectedReimbursement
  },
  approveReimbursement: async (idOrSlug: string) => {
    console.log('aw, im hitted')
    console.log({ idOrSlug })

    // const approveReimbursement = await prisma.reimbursement.update({
    //   where: {
    //     id: idOrSlug
    //   },
    //   data: {
    //     status: 'APPROVED'
    //   }
    // })

    // return approveReimbursement
  }
}
