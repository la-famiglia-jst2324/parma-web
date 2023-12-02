'use client'
import React, { useEffect, useState } from 'react'
import Table from '../../components/Datasources/Table'
import DatasourcesLayout from './layout'
import CreateDatasource from '@/components/Datasources/CreateDatasource'
import type Datasource from '@/types/datasource'

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

export default function DatasourcesPage() {
  const [data, setData] = useState<Datasource[]>([])

  useEffect(() => {
    getDatasources()
      .then(setData)
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [])

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
                <Table data={data} />
              </div>
            </div>
          </div>
        </div>
      </DatasourcesLayout>
    </>
  )
}
