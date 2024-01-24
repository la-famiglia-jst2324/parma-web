'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource, ScheduledTask, Company } from '@prisma/client'
import { editDatasource, getDatasourceById, getScheduledTasks } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { HeaderComponent } from '@/components/datasources/DatasourcePageHeader'
import { ButtonGroup } from '@/components/datasources/ButtonGroup'
import { TabComponent } from '@/components/datasources/DatasourceTabComponent'
import { GoBackButton } from '@/components/GoBackButton'
import DescriptionCard from '@/components/datasources/Card'
import { getCompaniesByDatasourceId } from '@/services/company/companyService'

function DatasourcePage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<DataSource>()
  const [, setName] = useState<string>('')
  const [, setDescription] = useState<string>('')
  const [, setInvocationEndpoint] = useState<string>('')
  const [, setStatus] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tasksData, setTasksData] = useState<ScheduledTask[] | undefined>()
  const [refreshKey, setRefreshKey] = useState(0)
  const [companiesData, setCompaniesData] = useState<Company[] | undefined>()

  const refreshData = () => {
    setRefreshKey((oldKey) => oldKey + 1)
  }

  useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
  }, [id])

  useEffect(() => {
    getScheduledTasks(id)
      .then((scheduledTasks) => {
        setTasksData(scheduledTasks)
      })
      .catch((error) => {
        console.error('Failed to fetch scheduled tasks:', error)
      })
  }, [id, refreshKey])

  useEffect(() => {
    getCompaniesByDatasourceId(id)
      .then((companies) => {
        setCompaniesData(companies)
      })
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
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
    <main role="main">
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <div className="mb-3 flex items-center justify-center space-x-4">
            <div className="mt-1">
              <GoBackButton url="/datasources" />
            </div>
            <HeaderComponent data={data} />
          </div>
          <div className="flex items-center justify-end">
            <ButtonGroup
              handleSave={(updates) =>
                handleSave(updates.newName, updates.newDescription, updates.newUrl, updates.newStatus)
              }
              data={data}
              refreshData={refreshData}
            />
          </div>
        </div>
        <DescriptionCard
          data={data}
          handleSave={(updates) =>
            handleSave(updates.newName, updates.newDescription, updates.newUrl, updates.newStatus)
          }
        />
        <TabComponent tasksData={tasksData || []} companiesData={companiesData || []} sourceId={data.id.toString()} />
      </div>
    </main>
  )
}

export default MainLayoutWrapper(DatasourcePage)
