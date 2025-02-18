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
  }
}
