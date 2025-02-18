'use server'

import { revalidatePath } from 'next/cache'

// Mock service functions (replace with your actual service calls)
const reimbursementService = {
  approveReimbursement: async (id: string) => {
    // Simulate API call to approve reimbursement
    console.log(`Reimbursement with ID ${id} approved`)

    return { success: true }
  },
  rejectReimbursement: async (id: string) => {
    // Simulate API call to reject reimbursement
    console.log(`Reimbursement with ID ${id} rejected`)

    return { success: true }
  }
}

export const approveReimbursement = async (id: string) => {
  try {
    const result = await reimbursementService.approveReimbursement(id)

    if (result.success) {
      revalidatePath('/path-to-reimbursement-page') // Revalidate the page to reflect changes

      return { success: true, message: 'Reimbursement approved successfully' }
    }
  } catch (error) {
    console.error('Error approving reimbursement:', error)

    return { success: false, message: 'Failed to approve reimbursement' }
  }
}

export const rejectReimbursement = async (id: string) => {
  try {
    const result = await reimbursementService.rejectReimbursement(id)

    if (result.success) {
      revalidatePath('/path-to-reimbursement-page') // Revalidate the page to reflect changes

      return { success: true, message: 'Reimbursement rejected successfully' }
    }
  } catch (error) {
    console.error('Error rejecting reimbursement:', error)

    return { success: false, message: 'Failed to reject reimbursement' }
  }
}
