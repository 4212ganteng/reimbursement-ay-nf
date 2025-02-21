import { useState } from 'react'

import type { Reimbursement } from '@prisma/client'

import { getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'


import { fuzzyFilter } from '@/utils/FuzyFilter'
import { ReimbursementColumnApproveOrPending } from './ReimbursementColumnApproveOrPending'


type ReimbustTypeWithAction = Reimbursement & {
  action?: string
}

export const useReimbursementApproveOrReject = (data: ReimbustTypeWithAction[]) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')


  const table = useReactTable({
    data,
    columns: ReimbursementColumnApproveOrPending(),
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return { table, globalFilter, setGlobalFilter }
}
