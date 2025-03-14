'use server'

import { redirect } from 'next/navigation'

import { z } from 'zod'

import { reimbursementService } from '@/app/services/reimbursement.service'
import serverAuth from '@/libs/server-auth'
import { uploadFile } from '@/utils/aws'

// Definisikan type untuk response
type ActionResponse = {
  success: boolean
  message?: string
  errors?: any
  data?: any
}

// Schema validasi untuk form data
const ReimbursementSchema = z.object({
  description: z.string().optional(),
  price: z.number(),
  date: z.string(),
  reimbursmentImage: z.instanceof(File)
})

export async function submitReimbursementAction(prevstate: unknown, formData: FormData): Promise<ActionResponse> {
  const rawFormData = {
    reimbursmentImage: formData.get('reimbursementImage'),
    date: formData.get('date'),
    price: Number(formData.get('price')),
    description: formData.get('description') as string
  }

  const user = await serverAuth()
  const validatedData = ReimbursementSchema.safeParse(rawFormData)

  console.log({ validatedData })

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
      message: 'Validation failed',
      data: validatedData.error.errors
    }
  }

  const userId = await serverAuth()

  console.log({ userId })

  if (!userId) {
    return {
      success: false,
      message: 'Unauthorized: User not authenticated'
    }
  }

  const newReimbursement = await reimbursementService.createReimbursement({
    description: validatedData.data.description ?? null,
    invoiceImage: validatedData.data.reimbursmentImage.name,
    price: validatedData.data.price,
    date: validatedData.data.date,
    userId: userId.id,
    status: 'PENDING'
  })

  console.log({ newReimbursement })

  if (!newReimbursement) {
    return {
      success: false,
      message: 'Error creating reimbursement'
    }
  }

  console.log('aman si')

  // Process file uploads if any
  const upFile = await uploadFile({
    key: newReimbursement.invoiceImage,
    body: validatedData.data.reimbursmentImage,
    folder: `reimbust/${newReimbursement.id}`
  })

  if (!(newReimbursement && upFile)) {
    console.log('error cuy')

    return {
      success: false,
      message: 'Failed to submit reimbursement',
      data: 'Unknown error occurred'
    }
  }

  // Redirect on success

  if (user?.Role === 'MANAGER') {
    redirect('/en/manager/reimbursement/list/all-status')
  } else if (user?.Role === 'FINANCE') {
    redirect('/en/finance/reimbursement/list/all-status')
  } else {
    redirect('/en/staff/reimbursement/list/all-status')
  }
}
