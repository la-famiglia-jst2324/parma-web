import React from 'react'
import { useRouter } from 'next/navigation'
import Pagination from '../datasources/Table/TablePagination'
import { Table, TableBody, TableHeader, TableCell, TableHead, TableRow } from '@/components/ui/table'

interface SearchItem {
  id: number
  name: string
  description: string
  type: string
}

interface DataTableProps {
  data: SearchItem[]
  pagination: {
    currentPage: number
    pageSize: number
    totalPages: number
    totalCount: number
  }
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

function DataTable({ data, pagination, onPageChange, onItemsPerPageChange }: DataTableProps) {
  const router = useRouter()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: SearchItem) => (
          <TableRow
            key={`${item.id}-${item.type}`}
            onClick={() => router.push(`/${item.type === 'bucket' ? 'buckets' : 'companies'}/${item.id}`)}
            className="cursor-pointer"
          >
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <Pagination /> */}
      <Pagination
        totalItems={pagination.totalCount}
        currentPage={pagination.currentPage}
        itemsPerPage={pagination.pageSize}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Table>
  )
}

export default DataTable
