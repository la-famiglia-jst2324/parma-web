'use client'
import React, { useEffect, useState } from 'react'
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import type { Bucket, Company, DataSource } from '@prisma/client'
import { DataTablePagination } from './DataTablePagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  type: string
  toggleColumn?: { columnId: string; value: boolean }
  sendDataToParent?: (data: number | number[]) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
  toggleColumn,
  sendDataToParent
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  useEffect(() => {
    const col = table.getAllColumns().find((col) => col.id === toggleColumn?.columnId)
    if (col) col.toggleVisibility(toggleColumn?.value)
  }, [toggleColumn?.value])

  const handleRowSelection = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    id: number,
    row: Row<TData>
  ) => {
    event.stopPropagation() // Stop navigating
    if (!selectedRows.includes(id)) {
      setSelectedRows([...selectedRows, id])
      row.toggleSelected(true)
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id))
      row.toggleSelected(false)
    }
    if (sendDataToParent) {
      sendDataToParent(id)
    }
  }

  const selectAllRows = () => {
    const ids = data.map((row) => ((row as Bucket) || (row as Company) || (row as DataSource)).id)
    const isIncluded = ids.every((element) => selectedRows.includes(element))
    console.log(isIncluded)
    if (isIncluded) {
      setSelectedRows([])
      table.toggleAllPageRowsSelected(false)
      if (sendDataToParent) {
        sendDataToParent([])
      }
    } else {
      setSelectedRows(ids)
      table.toggleAllPageRowsSelected(true)
      if (sendDataToParent) {
        sendDataToParent(ids)
      }
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  const router = useRouter()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.id === 'select') {
                  return (
                    <TableHead key={header.id} onClick={selectAllRows}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                } else {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const id = row.getValue('id') as number
              const key = type ? `${id}-${type}` : `${id}`
              return (
                <TableRow
                  key={key}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    let path = ''
                    if (type === 'search') {
                      const rowType = row.getValue('type') as string
                      rowType === 'bucket' ? (path = 'buckets') : (path = 'companies')
                    } else {
                      path = type
                    }

                    router.push(`/${path}/${id}`)
                  }}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => {
                    if (!(cell.column.id === 'select')) {
                      return (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      )
                    } else {
                      return (
                        <TableCell
                          key={cell.id}
                          onClick={(e) => handleRowSelection(e, (cell.row.original as Company).id, row)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}
