'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Table from '../../components/Datasources/Table'
import type Datasource from '@/types/datasource'
import { MainLayout } from '@/components/MainLayout'
import AuthCheck from '@/components/Authentication/AuthCheck'
import CustomButton from '@/components/BlueButton'

async function getDatasources() {
  try {
    const res = await fetch('/api/dataSources', {
      method: 'GET',
      cache: 'no-cache'
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

function DatasourcesPage() {
  const [data, setData] = useState<Datasource[]>([])

  useEffect(() => {
    getDatasources()
      .then(setData)
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [])

  const router = useRouter()
  const navigateToCreate = () => {
    router.push('/datasources/add-datasource')
  }

  return (
    <>
      <MainLayout>
        <div className="relative m-5 flex min-h-screen w-auto flex-col justify-start rounded-md bg-white shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="mb-4 flex items-center justify-start space-x-4">
              <h1 className="m-4 text-4xl text-black">Datasources</h1>
            </div>
            <div className="m-4">
              <CustomButton text="Create Datasource" onClick={navigateToCreate} />
            </div>
          </div>
          <div className="p-8">
            {data ? (
              <div className="mx-4 rounded-lg border-0 bg-white shadow-md">
                <div>
                  <Table data={data} />
                </div>
              </div>
            ) : (
              <p className="text-lg font-semibold text-gray-600">
                No datasources available yet. Start by creating one.
              </p>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default AuthCheck(DatasourcesPage)
