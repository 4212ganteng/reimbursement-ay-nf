'use server'

import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation'

import { reimbursementService } from '@/app/services/reimbursement.service'

export const approveReimbursement = async (id: string) => {
  const result = await reimbursementService.approveReimbursement(id)

  if (!result) {
    console.error('Error approving reimbursement:')

    return { success: false, message: 'Failed to approve reimbursement' }
  }

  revalidatePath('/en/apps/reimbursement/list/approved', 'page') // Revalidate the page to reflect changes
}

export const rejectReimbursement = async (id: string) => {
  const result = await reimbursementService.rejectReimbursement(id)

  if (!result) {
    console.error('Error rejecting reimbursement:')

    return { success: false, message: 'Failed to reject reimbursement' }
  }

  // revalidatePath('/[lang]/apps/reimbursement/list', 'page') // Revalidate the page to reflect changes

  redirect('/en/apps/reimbursement/list/rejected')
}
