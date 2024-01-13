import React from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableHeader, TableCell, TableHead, TableRow } from '@/components/ui/table'

interface SearchItem {
  id: number
  name: string
  description: string
  type: string
}

interface DataTableProps {
  data: SearchItem[]
}

function DataTable({ data }: DataTableProps) {
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
    </Table>
  )
}

export default DataTable
