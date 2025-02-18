import { useState } from 'react'

import type { Reimbursement, User } from '@prisma/client'

import { getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import type { Locale } from '@/configs/i18n'

import { ReimbursementColumn } from './ReimbursementColumn'
import { fuzzyFilter } from '@/utils/FuzyFilter'


type ReimbustTypeWithAction = Reimbursement & {
  action?: string
}

export const useReimbursementTable = (data: ReimbustTypeWithAction[], locale: Locale) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const clg = (msg: any) => console.log(`ini adalah message, ${msg}`)

  const table = useReactTable({
    data,
    columns: ReimbursementColumn(locale, clg),
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
