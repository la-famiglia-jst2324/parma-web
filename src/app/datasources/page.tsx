import React from 'react'
import Table from '../../components/Datasources/Table'
import DatasourcesLayout from './layout'
import CreateDatasource from '@/components/Datasources/CreateDatasource'

async function getDatasources() {
  const res = await fetch(process.env.URL + '/api/datasources', {
    method: 'GET'
  })

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  return await res.json()
}

export default async function DatasourcesPage() {
  const data = await getDatasources()

  return (
    <>
      <DatasourcesLayout>
        <div className="relative m-5 flex min-h-screen w-auto flex-col justify-start bg-white shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="mb-2 flex items-center justify-start space-x-4">
              <h1 className="m-6">Datasources</h1>
            </div>
            <div className="m-6">
              <CreateDatasource />
            </div>
          </div>
          <div className="p-14">
            <div className="mx-6 rounded-lg border-0 bg-white shadow-md">
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
