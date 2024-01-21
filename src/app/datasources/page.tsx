'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import { getDataSources as getDatasources } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import CreateDatasource from '@/components/datasources/CreateDatasource'
import { DataTable } from '@/components/DataTable/Table'
import { columns } from '@/components/datasources/Columns'

function DatasourcesPage() {
  const [data, setData] = useState<DataSource[] | null>(null)

  useEffect(() => {
    getDatasources()
      .then((response) => {
        setData(response.datasources)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [])

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="mb-4 flex items-center justify-start space-x-4"></div>
        <div className="mx-5 mb-5 mt-2">
          <CreateDatasource />
        </div>
      </div>
      <div className="mb-8 px-6">
        <div className="mx-auto overflow-auto rounded-lg border-0 shadow-md">
          <div className="w-full">
            {data ? (
              <DataTable columns={columns} data={data} />
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
