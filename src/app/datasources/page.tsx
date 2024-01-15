'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import Table from '../../components/datasources/Table'
import { getDataSourcesPagination as getDatasources } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import CreateDatasource from '@/components/datasources/CreateDatasource'
function DatasourcesPage() {
  const [data, setData] = useState<DataSource[] | null>(null)
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10, totalPages: 0, totalCount: 0 })

  useEffect(() => {
    getDatasources(pagination.currentPage, pagination.pageSize)
      .then((response) => {
        setData(response.datasources)
        setPagination(response.pagination)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [pagination.currentPage, pagination.pageSize])

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: newPage }))
  }

  const handleItemsPerPageChange = (newSize: number) => {
    setPagination((prevState) => ({ ...prevState, pageSize: newSize }))
  }

  return (
    <>
      <div className="flex items-center justify-between p-6">
        <div className="mb-4 flex items-center justify-start space-x-4">
          <h1 className="m-4 text-4xl text-white">Datasources</h1>
        </div>
        <div className="m-5">
          <CreateDatasource />
        </div>
      </div>
      <div className="mb-8 px-6">
        <div className="mx-auto overflow-auto rounded-lg border-0 shadow-md">
          <div className="w-full">
            {data ? (
              <Table
                initialData={data}
                pagination={pagination}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            ) : (
              <p className="text-lg font-bold text-gray-300">No datasources available yet. Start by creating one.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayoutWrapper(DatasourcesPage)
