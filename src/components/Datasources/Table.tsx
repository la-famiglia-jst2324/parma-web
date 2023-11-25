'use client'
import React from 'react'
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge } from '@tremor/react'
import { useRouter } from 'next/navigation'
import type Datasource from '@/types/datasource'

interface TableProps {
  data: Datasource[]
}

const DatasourceTable = ({ data }: TableProps) => {
  const router = useRouter()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Datasource Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((datasource) => (
          <TableRow
            key={datasource.id}
            onClick={() => router.push(`/datasources/${datasource.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <TableCell>{datasource.sourceName}</TableCell>
            <TableCell>{datasource.description}</TableCell>
            <TableCell>
              {datasource.isActive ? <Badge color="blue">Active</Badge> : <Badge color="red">Inactive</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DatasourceTable
