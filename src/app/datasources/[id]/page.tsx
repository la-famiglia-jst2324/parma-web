'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import Link from 'next/link'
import { editDatasource, getDatasourceById } from '@/services/datasource/datasourceService'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'
import { HeaderComponent } from '@/components/datasources/DatasourcePageHeader'
import { ButtonGroup } from '@/components/datasources/ButtonGroup'
import { TabComponent } from '@/components/datasources/DatasourceTabComponent'
import { useModal } from '@/components/datasources/hooks/useModal'

function DatasourcePage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<DataSource>()
  const disableModal = useModal()
  const deleteModal = useModal()
  const editModal = useModal()
  const [sourceName, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [invocationEndpoint, setInvocationEndpoint] = useState<string>('')
  const [, setStatus] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  const handleDisableButtonClick = () => {
    disableModal.openModal()
  }

  const handleDeleteButtonClick = async () => {
    deleteModal.openModal()
  }

  const handleEditButtonClick = async () => {
    editModal.openModal()
  }

  const handleClose = () => {
    disableModal.closeModal()
    deleteModal.closeModal()
    editModal.closeModal()
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
        handleClose()
      }
    } catch (error) {
      console.error('Failed to update datasource:', error)
    }
  }

  const handleEnableButtonClick = async () => {
    handleSave(sourceName, description, invocationEndpoint, true).catch((error) => {
      console.error('An error occurred:', error)
    })
  }

  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
      <div className="mb-3 flex w-full items-center justify-between space-x-4">
        {/* Name, description and status */}
        <HeaderComponent data={data} />
        {/* Buttons */}
        <ButtonGroup
          handleSave={(updates) =>
            handleSave(updates.newName, updates.newDescription, updates.newUrl, updates.newStatus)
          }
          data={data}
          handleDisableButtonClick={handleDisableButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          handleEnableButtonClick={handleEnableButtonClick}
          handleEditButtonClick={handleEditButtonClick}
          disableModal={disableModal}
          deleteModal={deleteModal}
          editModal={editModal}
        />
      </div>
      {/* Datasource Information */}
      <p className="mb-1 ml-9 mr-10 text-base text-gray-700">{data.description}</p>
      <Link
        href={data.invocationEndpoint}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-1 ml-9 text-base text-gray-900 hover:text-blue-600"
      >
        Source: {data.invocationEndpoint}
      </Link>
      {/* Tabs */}
      <TabComponent sourceId={data.id.toString()} />
    </main>
  )
}

export default MainLayoutWrapper(DatasourcePage)
