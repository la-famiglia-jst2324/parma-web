'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import { getDataSources as getDatasources } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { DataTable } from '@/components/DataTable/Table'
import { columns } from '@/components/datasources/Table/Columns'
import InformationCard from '@/components/datasources/InformationCard'
import { Label } from '@/components/ui/label'

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
      <InformationCard />
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-200">Available Datasources</h2>
        <div className="mx-auto overflow-auto rounded-lg border-0 shadow-md">
          <div className="w-full">
            {data ? (
              <DataTable columns={columns} data={data} type="datasources" />
            ) : (
              <Label className="text-md text-gray-300">No datasources available yet. Start by creating one.</Label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayoutWrapper(DatasourcesPage)
