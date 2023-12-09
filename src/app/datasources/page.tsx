'use client'
import React, { useEffect, useState } from 'react'
import type { DataSource } from '@prisma/client'
import Table from '../../components/Datasources/Table'
import DatasourcesLayout from './layout'
import CreateDatasource from '@/components/Datasources/CreateDatasource'

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

export default function DatasourcesPage() {
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

  return (
    <>
      <DatasourcesLayout>
        <div className="relative m-6 flex min-h-screen w-auto flex-col justify-start rounded-lg bg-white shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="mb-4 flex items-center justify-start space-x-4">
              <h1 className="m-4">Datasources</h1>
            </div>
            <div className="m-4">
              <CreateDatasource />
            </div>
          </div>
          <div className="p-8">
            <div className="mx-4 rounded-lg border-0 bg-white shadow-md">
              <div>
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
      </DatasourcesLayout>
    </>
  )
}
