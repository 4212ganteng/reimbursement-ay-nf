// app/[lang]/(dashboard)/apps/reimbursement/add/action.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { z } from 'zod'

import { prisma } from '@/utils/prisma'

// Definisikan type untuk response
type ActionResponse = {
  success: boolean
  message?: string
  data?: any
}

// Schema validasi untuk form data
const ReimbursementSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  position: z.string().min(1, 'Position is required'),
  contact: z.string().min(1, 'Contact is required'),
  description: z.string().optional()
})

export async function submitReimbursementAction(prevstate: unknown, formData: FormData): Promise<ActionResponse> {
  try {
    // Ambil cookie dengan safe check
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    // if (!userId) {
    //   return {
    //     success: false,
    //     message: 'Unauthorized: User not authenticated'
    //   }
    // }

    // Parse dan validasi form data
    const rawFormData = {
      fullName: formData.get('fullName'),
      position: formData.get('position'),
      contact: formData.get('contact'),
      description: formData.get('description') || ''
    }

    const validatedData = ReimbursementSchema.safeParse(rawFormData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Validation failed',
        data: validatedData.error.errors
      }
    }

    // Process file uploads if any
    const files = formData.getAll('files')
    const fileUrls = []

    console.log({ files, fileUrls, rawFormData })

    // Implement your file upload logic here
    // for (const file of files) {
    //   const uploadedUrl = await uploadFile(file)
    //   fileUrls.push(uploadedUrl)
    // }

    // Save to database
    const reimbursement = await prisma.reimbursement.create({
      data: {
        userId,
        ...validatedData.data,
        status: 'PENDING',
        attachments: {
          create: fileUrls.map(url => ({
            fileUrl: url
          }))
        }
      }
    })

    // Redirect on success
    redirect('/reimbursement')
  } catch (error) {
    console.error('Reimbursement submission error:', error)

    return {
      success: false,
      message: 'Failed to submit reimbursement',
      data: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
