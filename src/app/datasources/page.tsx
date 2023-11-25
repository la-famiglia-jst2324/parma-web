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
        <div className="h-screen w-full pt-12">
          <div className="container mx-auto">
            <h1 className="m-6">Datasources</h1>
            <div className="m-6">
              <CreateDatasource />
            </div>
          </div>
          <div className="mx-6 rounded-lg border-0 bg-white shadow-md">
            <div>
              <Table data={datasources} />
            </div>
          </div>
        </div>
      </DatasourcesLayout>
    </>
  )
}
