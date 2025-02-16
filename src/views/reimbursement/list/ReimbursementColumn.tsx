
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'

import { Checkbox, Chip, IconButton, Switch, Typography } from '@mui/material'

import classnames from 'classnames'
import type { User } from '@prisma/client'


import type { Locale } from '@configs/i18n'

const columnHelper = createColumnHelper<UsersTypeWithAction>()


import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'


import type { ThemeColor } from '@/@core/types'

type UsersTypeWithAction = User & {
  action?: string
}


type ProductCategoryType = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

type productStatusType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

// Vars
const productCategoryObj: ProductCategoryType = {
  Accessories: { icon: 'tabler-headphones', color: 'error' },
  'Home Decor': { icon: 'tabler-smart-home', color: 'info' },
  Electronics: { icon: 'tabler-device-laptop', color: 'primary' },
  Shoes: { icon: 'tabler-shoe', color: 'success' },
  Office: { icon: 'tabler-briefcase', color: 'warning' },
  Games: { icon: 'tabler-device-gamepad-2', color: 'secondary' }
}

const productStatusObj: productStatusType = {
  Scheduled: { title: 'Scheduled', color: 'warning' },
  Published: { title: 'Publish', color: 'success' },
  Inactive: { title: 'Inactive', color: 'error' }
}


export const ReimbursementColumn = (locale: Locale): ColumnDef<UsersTypeWithAction, any>[] => [
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
  columnHelper.accessor('productName', {
    header: 'Product',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <img src={row.original.image} width={38} height={38} className='rounded bg-actionHover' />
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.primary'>
            {row.original.productName}
          </Typography>
          <Typography variant='body2'>{row.original.productBrand}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <CustomAvatar skin='light' color={productCategoryObj[row.original.category].color} size={30}>
          <i className={classnames(productCategoryObj[row.original.category].icon, 'text-lg')} />
        </CustomAvatar>
        <Typography color='text.primary'>{row.original.category}</Typography>
      </div>
    )
  }),
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: ({ row }) => <Switch defaultChecked={row.original.stock} />,
    enableSorting: false
  }),
  columnHelper.accessor('sku', {
    header: 'SKU',
    cell: ({ row }) => <Typography>{row.original.sku}</Typography>
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: ({ row }) => <Typography>{row.original.price}</Typography>
  }),
  columnHelper.accessor('qty', {
    header: 'QTY',
    cell: ({ row }) => <Typography>{row.original.qty}</Typography>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <Chip
        label={productStatusObj[row.original.status].title}
        variant='tonal'
        color={productStatusObj[row.original.status].color}
        size='small'
      />
    )
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center'>
        <IconButton>
          <i className='tabler-edit text-textSecondary' />
        </IconButton>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={[
            { text: 'Download', icon: 'tabler-download' },
            {
              text: 'Delete',
              icon: 'tabler-trash',

              // menuItemProps: { onClick: () => setData(data?.filter(product => product.id !== row.original.id)) }
            },
            { text: 'Duplicate', icon: 'tabler-copy' }
          ]}
        />
      </div>
    ),
    enableSorting: false
  })
]
