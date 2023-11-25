import React from 'react'
import Table from '../../components/Datasources/Table'
import DatasourcesLayout from './layout'
import type Datasource from '@/types/datasource'
import CreateDatasource from '@/components/Datasources/CreateDatasource'

// async function getDatasources() {
//   const res = await fetch('/api/datasources?page=1', {
//     method: 'GET',
//     cache: 'no-cache'
//   })
//   const json = await res.json()
//   return json
// }

const datasources: Datasource[] = [
  {
    id: 1,
    sourceName: 'datasource 1',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 2,
    sourceName: 'datasource 2',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 3,
    sourceName: 'datasource 3',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 4,
    sourceName: 'datasource 4',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 3,
    sourceName: 'datasource 5',
    description: 'description',
    isActive: false,
    defaultFrequency: '',
    healthStatus: 'up'
  },
  {
    id: 4,
    sourceName: 'datasource 6',
    description: 'description',
    isActive: true,
    defaultFrequency: '',
    healthStatus: 'up'
  }
]

export default function DatasourcesPage() {
  // const data = getDatasources();

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
                <Table data={datasources} />
              </div>
            </div>
          </div>
        </div>
      </DatasourcesLayout>
    </>
  )
}
