'use client'
import type { Company } from '@prisma/client'
import React from 'react'
import { useRouter } from 'next/navigation'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { DataTable } from '../DataTable/Table'
import { Button } from '../ui/button'
import { IdentifierModal } from './Identifiers/IdentifierModal'

interface CompaniesTableProps {
  datasourceId: string
  companiesData: Company[]
}

export const CompaniesTable = ({ datasourceId, companiesData }: CompaniesTableProps) => {
  const data = companiesData
  const dataSourceId = datasourceId
  const router = useRouter()

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: { row: Row<Company> }) => {
        const name = row.getValue('name') as string
        return (
          <div onClick={() => router.push(`/companies/${name}`)} style={{ cursor: 'pointer' }}>
            {name}
          </div>
        )
      }
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }: { row: Row<Company> }) => {
        const description = row.getValue('description') as string
        return (
          <div onClick={() => router.push(`/companies/${description}`)} style={{ cursor: 'pointer' }}>
            {description}
          </div>
        )
      }
    },
    {
      accessorKey: 'id',
      header: 'Configure Identifier',
      cell: ({ row }: { row: Row<Company> }) => {
        const id = row.getValue('id') as string
        return <IdentifierModal companyId={id} datasourceId={dataSourceId} />
      }
    }
  ]

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  return <DataTable columns={columns} data={data} type="no_redirect" />
}
