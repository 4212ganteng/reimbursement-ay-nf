
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'

import { Checkbox, Chip, Typography } from '@mui/material'




const columnHelper = createColumnHelper<ReimbursmentResponType>()




import type { ThemeColor } from '@/@core/types'
import type { ReimbursmentResponType } from '@/types/ReimbursemenType'





type reimbusStatusType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

// Vars


const reimbusStatusObj: reimbusStatusType = {
  PENDING: { title: 'PENDING', color: 'warning' },
  APPROVED: { title: 'APPROVED', color: 'success' },
  REJECTED: { title: 'REJECTED', color: 'error' }
}


const url = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/reimbursement-ayu-nur-fadillah/reimbust`

export const ReimbursementColumnApproveOrPending = (): ColumnDef<ReimbursmentResponType, any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },

  columnHelper.accessor('user.fullName', {
    header: 'Reimbust',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <img src={`${url}/${row.original.id}/${row.original.invoiceImage}`} width={38} height={38} className='rounded bg-actionHover' />
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.primary'>
            {row.original.user.fullName}
          </Typography>
          <Typography variant='body2'>{row.original.description}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: ({ row }) => (

      <Typography color='text.primary'>{row.original.date}</Typography>

    )
  }),

  columnHelper.accessor('price', {
    header: 'Price',
    cell: ({ row }) => <Typography>{row.original.price}</Typography>
  }),
  columnHelper.accessor('user.role', {
    header: 'Role',
    cell: ({ row }) => <Typography>{row.original.user.role}</Typography>
  }),
  columnHelper.accessor('user.contact', {
    header: 'Contact',
    cell: ({ row }) => <Typography>{row.original.user.contact}</Typography>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <Chip
        label={reimbusStatusObj[row.original.status]?.title}
        variant='tonal'
        color={reimbusStatusObj[row.original.status]?.color}
        size='small'
      />
    )
  }),

]
