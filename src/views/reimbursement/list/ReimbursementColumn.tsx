
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'

import { Checkbox, Chip, IconButton, Switch, Typography } from '@mui/material'

import classnames from 'classnames'
import type { User } from '@prisma/client'


import type { Locale } from '@configs/i18n'

const columnHelper = createColumnHelper<ReimbusTypeWithAction>()


import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'


import type { ThemeColor } from '@/@core/types'
import type { ReimbursmentResponType } from '@/types/ReimbursemenType'
import { ReimbustApproveAction } from '../action/ReimbustApproveAction'

type ReimbusTypeWithAction = ReimbursmentResponType & {
  action?: string
}




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


export const ReimbursementColumn = (locale: Locale, handleAproved): ColumnDef<ReimbusTypeWithAction, any>[] => [
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
    header: 'Product',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <img src={row.original.invoiceImage} width={38} height={38} className='rounded bg-actionHover' />
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
  columnHelper.accessor('action', {
    header: 'Actions',
    cell: ({ row }) => <ReimbustApproveAction row={row} />,
    enableSorting: false
  })
]
