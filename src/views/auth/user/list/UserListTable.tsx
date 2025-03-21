"use client"

// UserListTable.tsx
import { useActionState, useEffect, useState } from 'react'



import { Button, Card, CardHeader, MenuItem, TablePagination } from '@mui/material'

// Third-party Imports
import {
  flexRender
} from '@tanstack/react-table'

import classnames from 'classnames'


import { toast } from 'react-toastify'

import type { User } from '@prisma/client'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

// import { TableFilters } from './TableFilters'
import { RegisterUserAction } from '@/app/[lang]/(dashboard)/(role-pages)/manager/(auth)/user/action'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { DebouncedInput } from '@/utils/DebouncedInput'
import AddUserDrawer from './AddUserDrawer'
import { useUserTable } from './UserTable'

type UsersTypeWithAction = User & {
  action?: string
}

const UserListTable = ({ tableData }: { tableData?: UsersTypeWithAction[] }) => {
  const [state, formAction, pending] = useActionState(RegisterUserAction, null,)


  useEffect(() => {
    if (state?.status === 'error') {
      toast(state.message)
    }
  }, [state])


  const [addUserOpen, setAddUserOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredData, setFilteredData] = useState(tableData || [])
  const { table, globalFilter, setGlobalFilter } = useUserTable(filteredData)

  console.log(state)

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        {/* <TableFilters setData={setFilteredData} tableData={data} /> */}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add New User
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        formAction={formAction}
        pending={pending}
        state={state}


      />
    </>
  )
}

export default UserListTable
