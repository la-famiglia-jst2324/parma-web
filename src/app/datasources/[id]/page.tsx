'use client'
import React, { useEffect, useState } from 'react'
import {
  TrashIcon,
  PencilIcon,
  StatusOnlineIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  OfficeBuildingIcon
} from '@heroicons/react/outline'
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import type { DataSource } from '@prisma/client'
import Link from 'next/link'
import GoBackButton from '@/components/Datasources/GoBackButton'
import ModalComponent from '@/components/Datasources/DisableModal'
import DeleteModal from '@/components/Datasources/DeleteModal'
import EditInformationModal from '@/components/Datasources/EditInformationModal'
import { CompaniesTable } from '@/components/Datasources/CompaniesTable'
import { editDatasource } from '@/utils/datasources/editDatasource'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'

async function getDatasource(id: string) {
  try {
    const res = await fetch(`/api/dataSources/${id}`, {
      method: 'GET'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return json
  } catch (error) {
    console.log('An error has occurred: ', error)
  }
}

function DatasourcePage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<DataSource>()
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [sourceName, setName] = useState('')
  const [description, setDescription] = useState('')
  const [invocationEndpoint, SetInvocationEndpoint] = useState('')
  const [status, setStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getDatasource(id)
      .then((datasource) => {
        setData(datasource)
        setName(datasource.sourceName)
        setDescription(datasource.description)
        SetInvocationEndpoint(datasource.invocationEndpoint)
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
    setIsDisableModalOpen(true)
  }

  const handleDeleteButtonClick = async () => {
    setIsDeleteModalOpen(true)
  }

  const handleEnableButtonClick = async () => {
    try {
      const updatedDatasource = await editDatasource(id, sourceName, true, description, invocationEndpoint)
      if (data.id === Number(id)) {
        setData(updatedDatasource)
      }
    } catch (error) {
      console.error('Failed to update datasource:', error)
    }
  }

  const handleEditButtonClick = async () => {
    setIsEditModalOpen(true)
  }

  const handleClose = () => {
    setIsDisableModalOpen(false)
    setIsDeleteModalOpen(false)
    setIsEditModalOpen(false)
  }

  const handleSave = async (newName: string, newStatus: boolean, newDescription: string, newUrl: string) => {
    try {
      const updatedDatasource = await editDatasource(id, newName, newStatus, newDescription, newUrl)
      if (data.id === Number(id)) {
        setData(updatedDatasource)
        handleClose()
      }
    } catch (error) {
      console.error('Failed to update datasource:', error)
    }
  }

  return (
    <MainLayout>
      <div className="m-6 flex flex-col items-start rounded-lg border-0 bg-white p-5 shadow-md">
        <div className="mb-3 flex w-full items-center justify-between space-x-4">
          <div className="mb-2 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1 className="text-4xl text-black"> {data.sourceName} </h1>
            <div
              className={`inline-flex items-center rounded-full px-2 py-1 text-sm ${
                data.isActive ? 'bg-blue-200 text-blue-700' : 'bg-red-200 text-red-700'
              }`}
            >
              <StatusOnlineIcon className="mr-2 h-5 w-5" />
              {data.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          <div className="mr-8 flex items-center justify-end space-x-4">
            <div>
              <button
                className="flex items-center rounded-md border border-slate-500 bg-transparent px-4 py-2 text-slate-500 hover:bg-slate-200 hover:text-gray-700"
                onClick={handleEditButtonClick}
              >
                <PencilIcon className="mr-2 h-5 w-5" />
                Edit Information
              </button>
              <EditInformationModal
                isOpen={isEditModalOpen}
                handleClose={handleClose}
                sourceName={sourceName}
                description={description}
                url={invocationEndpoint}
                isActive={status}
                handleSave={async (newName: string, newDescription: string, newUrl: string, newStatus: boolean) => {
                  try {
                    await handleSave(newName, newStatus, newDescription, newUrl)
                  } catch (error) {
                    console.error('Failed to save:', error)
                  }
                }}
              />
            </div>
            <div>
              {data.isActive ? (
                <>
                  <Button color="red" onClick={handleDisableButtonClick}>
                    Disable
                  </Button>
                  <ModalComponent
                    isOpen={isDisableModalOpen}
                    handleClose={handleClose}
                    sourceName={data.sourceName}
                    description={data.description || ''}
                    url={data.invocationEndpoint || ''}
                    handleSave={async (newName: string, newDescription: string, newUrl: string, newStatus: boolean) => {
                      try {
                        await handleSave(newName, newStatus, newDescription, newUrl)
                      } catch (error) {
                        console.error('Failed to save:', error)
                      }
                    }}
                  />
                </>
              ) : (
                <Button color="gray" onClick={handleEnableButtonClick}>
                  Enable
                </Button>
              )}
            </div>
            <div>
              <button
                color="blue"
                className="mr-2 flex items-center bg-transparent text-red-500"
                onClick={handleDeleteButtonClick}
              >
                <TrashIcon className="mr-2 h-5 w-5 text-red-500" />
                Delete
              </button>
              <DeleteModal isOpen={isDeleteModalOpen} handleClose={handleClose} id={data.id.toString()} />
            </div>
          </div>
        </div>
        <p className="mb-1 ml-9 mr-10 text-base text-gray-700">{data.description}</p>
        <Link
          href={data.invocationEndpoint}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 ml-9 text-base text-gray-900 hover:text-blue-600"
        >
          Source Link: {data.invocationEndpoint}
        </Link>
        <TabGroup>
          <TabList className="mt-8" variant="solid">
            <Tab icon={OfficeBuildingIcon}>Companies Monitored</Tab>
            <Tab icon={ShieldCheckIcon}>Datasource Health</Tab>
            <Tab icon={PresentationChartLineIcon}>Scheduling Tasks</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompaniesTable datasourceId={data.id.toString()} />
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">No data available</h1>
                <p className="text-gray-500">No data has been collected yet</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">No data available</h1>
                <p className="text-gray-500">No data has been collected yet</p>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </MainLayout>
  )
}

export default AuthCheck(DatasourcePage)
