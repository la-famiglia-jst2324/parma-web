'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import { editDatasource, getDatasourceById } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { HeaderComponent } from '@/components/datasources/DatasourcePageHeader'
import { ButtonGroup } from '@/components/datasources/ButtonGroup'
import { TabComponent } from '@/components/datasources/DatasourceTabComponent'

function DatasourcePage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<DataSource>()
  const [sourceName, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [invocationEndpoint, setInvocationEndpoint] = useState<string>('')
  const [, setStatus] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(sourceName, description, invocationEndpoint)
  useEffect(() => {
    getDatasourceById(id)
      .then((datasource) => {
        setData(datasource)
        setName(datasource.sourceName)
        setDescription(datasource.description)
        setInvocationEndpoint(datasource.invocationEndpoint)
        setStatus(datasource.isActive)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch datasource:', error)
      })
  }, [id])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center text-2xl text-gray-500">Loading...</div>
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-gray-500">
        Datasource doesn't seem to exist!
      </div>
    )
  }

  const handleSave = async (
    newName: string,
    newDescription: string,
    newInvocationEndpoint: string,
    newStatus: boolean
  ) => {
    try {
      const updatedDatasource = await editDatasource(id, {
        sourceName: newName,
        isActive: newStatus,
        description: newDescription,
        invocationEndpoint: newInvocationEndpoint
      })
      if (data && data.id === Number(id)) {
        setData(updatedDatasource)
        setName(newName)
        setDescription(newDescription)
        setInvocationEndpoint(newInvocationEndpoint)
        setStatus(newStatus)
      }
    } catch (error) {
      console.error('Failed to update datasource:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div>
          <HeaderComponent data={data} />
        </div>
        <div className="flex justify-end">
          <ButtonGroup
            handleSave={(updates) =>
              handleSave(updates.newName, updates.newDescription, updates.newUrl, updates.newStatus)
            }
            data={data}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-4">
        <div className="flex flex-col items-start justify-start font-semibold text-gray-500">DESCRIPTION</div>
        <p className="mb-1 text-base text-gray-700">{data.description}</p>
      </div>
      <TabComponent sourceId={data.id.toString()} />
    </div>
  )
}

export default MainLayoutWrapper(DatasourcePage)
