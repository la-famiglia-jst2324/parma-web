'use client'
import type { Company } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../ui/table'

async function getCompanies(dataSourceId: string) {
  return fetch(`/api/companyDataSourceRelation?dataSourceId=${dataSourceId}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          console.log('No companies linked to this datasource!')
        }
        console.log(`HTTP error! status: ${response.status}`)
        return null
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

interface CompaniesTableProps {
  datasourceId: string
}

export const CompaniesTable = ({ datasourceId }: CompaniesTableProps) => {
  const [data, setData] = useState<Company[] | undefined>()

  const dataSourceId = datasourceId
  const router = useRouter()

  useEffect(() => {
    getCompanies(dataSourceId)
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((company) => (
          <TableRow
            key={company.name}
            onClick={() => router.push(`/companies/${company.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
