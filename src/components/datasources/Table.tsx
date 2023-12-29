'use client'
import React, { useState, useEffect } from 'react'
import { Badge } from '@tremor/react'
import { useRouter } from 'next/navigation'
import type { DataSource } from '@prisma/client'
import Pagination from './TablePagination'

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
      <table className="w-full divide-y divide-gray-200 border border-gray-200">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-6 py-3 text-left">Datasource Name</th>
            <th className="whitespace-nowrap px-6 py-3 text-left">Description</th>
            <th className="w-44 whitespace-nowrap px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datasource) => (
            <tr
              key={datasource.id}
              onClick={() => router.push(`/datasources/${datasource.id}`)}
              className="cursor-pointer"
            >
              <td className="px-6 py-3">{datasource.sourceName}</td>
              <td className="px-6 py-3">{datasource.description}</td>
              <td className="px-6 py-3">
                {datasource.isActive ? <Badge color="blue">Active</Badge> : <Badge color="red">Inactive</Badge>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={pagination.totalCount}
        currentPage={pagination.currentPage}
        itemsPerPage={pagination.pageSize}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </>
  )
}

export default DatasourceTable
