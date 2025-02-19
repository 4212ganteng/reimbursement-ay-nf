'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { approveReimbursement, rejectReimbursement } from '@/app/[lang]/(dashboard)/apps/reimbursement/list/action'

type ActionModalState = {
  open: boolean
  type: 'approve' | 'reject' | null
}

export const ReimbustApproveAction = ({ row }: { row: any }) => {
  const [modalState, setModalState] = useState<ActionModalState>({
    open: false,
    type: null
  })

  console.log({ row })

  const router = useRouter()

  const handleAction = async () => {
    try {
      if (modalState.type === 'approve') {
        const approved = await approveReimbursement(row.original.id)

        console.log(approved)
      } else if (modalState.type === 'reject') {
        await rejectReimbursement(row.original.id)

      }

      setModalState({ open: false, type: null })
      router.refresh()

    } catch (error) {
      console.error('Error updating reimbursement:', error)
    }
  }

  const modalConfig = {
    approve: {
      title: 'Confirm Reimbursement Approval',
      content: `Are you sure you want to approve this reimbursement request from ${row.original.user.fullName}? Amount: $${row.original.price}`,
      buttonColor: 'success',
      buttonText: 'Approve'
    },
    reject: {
      title: 'Confirm Reimbursement Rejection',
      content: `Are you sure you want to reject this reimbursement request from ${row.original.user.fullName}? Amount: $${row.original.price}`,
      buttonColor: 'error',
      buttonText: 'Reject'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => setModalState({ open: true, type: 'approve' })}
        startIcon={<i className="tabler-check" />}
      >
        Approve
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => setModalState({ open: true, type: 'reject' })}
        startIcon={<i className="tabler-x" />}
      >
        Reject
      </Button>

      {modalState.type && (
        <Dialog
          open={modalState.open}
          onClose={() => setModalState({ open: false, type: null })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          closeAfterTransition={false}
        >
          <DialogTitle id="alert-dialog-title">
            {modalConfig[modalState.type].title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {modalConfig[modalState.type].content}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button
              onClick={() => setModalState({ open: false, type: null })}
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              variant="contained"
              color={modalConfig[modalState.type].buttonColor}
            >
              {modalConfig[modalState.type].buttonText}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
