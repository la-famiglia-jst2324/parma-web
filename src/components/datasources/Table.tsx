'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { DataSource } from '@prisma/client'
import Pagination from './TablePagination'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface TableProps {
  initialData: DataSource[]
  pagination: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalCount: number
  }
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

const DatasourceTable: React.FC<TableProps> = ({ initialData, pagination, onPageChange, onItemsPerPageChange }) => {
  const router = useRouter()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datasource Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datasource) => (
            <TableRow
              key={datasource.id}
              onClick={() => router.push(`/datasources/${datasource.id}`)}
              className="cursor-pointer"
            >
              <TableCell>{datasource.sourceName}</TableCell>
              <TableCell>{datasource.description}</TableCell>
              <TableCell>{datasource.isActive ? <Badge>Active</Badge> : <Badge>Inactive</Badge>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Pagination
            totalItems={pagination.totalCount}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.pageSize}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </TableFooter>
      </Table>
    </>
  )
}

export default DatasourceTable
