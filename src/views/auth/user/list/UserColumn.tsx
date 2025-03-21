// UserColumns.tsx

import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

import { Checkbox, Chip, Typography } from '@mui/material';

import type { User } from '@prisma/client';

import type { OverridableStringUnion } from '@mui/types';

import type { ChipPropsColorOverrides } from '@mui/material/Chip';





import { getInitials } from '@/utils/getInitials';
import CustomAvatar from '@core/components/mui/Avatar';


const columnHelper = createColumnHelper<UsersTypeWithAction>()


type UsersTypeWithAction = User & {
  action?: string
}

const userRoleObj = {
  STAFF: { icon: 'tabler-crown', color: 'error' },

  // author: { icon: 'tabler-device-desktop', color: 'warning' },
  // editor: { icon: 'tabler-edit', color: 'info' },
  MANAGER: { icon: 'tabler-chart-pie', color: 'success' },
  FINANCE: { icon: 'tabler-user', color: 'primary' }
}


const userStatusObj: Record<string, OverridableStringUnion<'default' | 'error' | 'success' | 'primary' | 'warning' | 'secondary' | 'info', ChipPropsColorOverrides>> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'secondary'
}

const getAvatar = (params: { avatar?: string; fullName: string }) => {
  const { avatar, fullName } = params

  if (avatar) {
    return <CustomAvatar src={avatar} size={34} />
  } else {
    return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
  }
}

export const userColumns = (): ColumnDef<UsersTypeWithAction, any>[] => [
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
  columnHelper.accessor('fullName', {
    header: 'User',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        {getAvatar({ avatar: row.original.avatarUrl || '', fullName: row.original.fullName })}
        <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium capitalize'>
            {row.original.fullName}
          </Typography>
          <Typography variant='body2'>{row.original.username}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <i
          className={userRoleObj[row.original.role].icon}
          style={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
        />
        <Typography className='capitalize' color='text.primary'>
          {row.original.role}
        </Typography>
      </div>
    )
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: ({ row }) => (
      <Typography className='capitalize' color='text.primary'>
        {row.original.email}
      </Typography>
    )
  }),
  columnHelper.accessor('contact', {
    header: 'Contact',
    cell: ({ row }) => <Typography>{row.original.contact}</Typography>
  }),


  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Chip
          variant='tonal'
          label={row.original.status}
          size='small'
          color={userStatusObj[row.original.status]}
          className='capitalize'
        />
      </div>
    )
  }),

]
