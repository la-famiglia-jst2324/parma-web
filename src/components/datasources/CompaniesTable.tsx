'use client'
import type { Company } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../ui/table'
import { IdentifierModal } from './Identifiers/IdentifierModal'
import { getCompaniesByDatasourceId } from '@/services/company/companyService'

interface CompaniesTableProps {
  datasourceId: string
}

export const CompaniesTable = ({ datasourceId }: CompaniesTableProps) => {
  const [data, setData] = useState<Company[] | undefined>()
  const dataSourceId = datasourceId
  const router = useRouter()

  useEffect(() => {
    getCompaniesByDatasourceId(dataSourceId)
      .then((companies) => {
        setData(companies)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [dataSourceId])

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Configure Identifier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((company) => (
          <TableRow key={company.name}>
            <TableCell onClick={() => router.push(`/companies/${company.id}`)} style={{ cursor: 'pointer' }}>
              {company.name}
            </TableCell>
            <TableCell onClick={() => router.push(`/companies/${company.id}`)} style={{ cursor: 'pointer' }}>
              {company.description}
            </TableCell>
            <TableCell>
              <IdentifierModal companyId={company.id.toString()} datasourceId={dataSourceId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
