'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DataSource } from '@prisma/client'
import Table from '../../components/Datasources/Table'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'
import CustomButton from '@/components/BlueButton'

async function getDatasources(page: number, size: number) {
  try {
    const res = await fetch(`/api/dataSources?page=${page}&size=${size}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    if (!res.ok) {
      console.log('Response status:', res.status)
      throw new Error('HTTP response was not OK')
    }
    const json = await res.json()
    return {
      datasources: json.datasources,
      pagination: json.pagination
    }
  } catch (error) {
    console.error('An error has occurred: ', error)
    throw error
  }
}

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

  console.log('data: ', data)
  console.log('pagination: ', pagination)

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({ ...prevState, currentPage: newPage }))
  }

  const handleItemsPerPageChange = (newSize: number) => {
    setPagination((prevState) => ({ ...prevState, pageSize: newSize }))
  }

  const router = useRouter()
  const navigateToCreate = () => {
    router.push('/datasources/add-datasource')
  }

  return (
    <>
      <MainLayout>
        <div className="relative m-5 flex min-h-screen w-auto flex-col justify-start rounded-md bg-white shadow-lg">
          <div className="flex items-center justify-between p-6">
            <div className="mb-4 flex items-center justify-start space-x-4">
              <h1 className="m-4 text-4xl text-black">Datasources</h1>
            </div>
            <div className="m-5">
              <CustomButton text="Create Datasource" onClick={navigateToCreate} />
            </div>
          </div>
          <div className="mb-8">
            <div className="mx-auto max-w-6xl overflow-auto rounded-lg border-0 bg-white shadow-md">
              {' '}
              {/* Added overflow-auto */}
              <div className="w-full">
                {data ? (
                  <Table
                    initialData={data}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                ) : (
                  <p className="text-lg font-bold text-gray-700">
                    No datasources available yet. Start by creating one.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default AuthCheck(DatasourcesPage)
