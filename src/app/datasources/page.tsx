'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import { PlusSquareIcon } from 'lucide-react'
import { getDataSources as getDatasources } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import CreateDatasource from '@/components/datasources/CreateDatasource'
import { DataTable } from '@/components/DataTable/Table'
import { columns } from '@/components/datasources/Table/Columns'
import { Button } from '@/components/ui/button'

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
    <div className="px-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-md text-justify text-gray-200">
            A datasource is a location from which data is extracted or collected. In the context of data scraping, it
            refers to websites or platforms like GitHub, LinkedIn, Reddit, etc., where data is gathered.
          </h1>
        </div>
        <div className="ml-10">
          <CreateDatasource
            triggerButton={
              <Button variant="outline">
                <PlusSquareIcon className="mr-2 h-4 w-4" />
                Create
              </Button>
            }
          />
        </div>
      </div>
      <div className="mb-8">
        <div className="mx-auto overflow-auto rounded-lg border-0 shadow-md">
          <div className="w-full">
            {data ? (
              <DataTable columns={columns} data={data} type="datasources" />
            ) : (
              <p className="text-lg font-bold text-gray-300">No datasources available yet. Start by creating one.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper(DatasourcesPage)
