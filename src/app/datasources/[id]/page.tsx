'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@tremor/react'
import { TrashIcon, PencilIcon, StatusOnlineIcon } from '@heroicons/react/outline'
import { TabComponent } from '@/components/Datasources/TabComponent'
import GoBackButton from '@/components/Datasources/GoBackButton'
import type Datasource from '@/types/datasource'

// Replace with the URL of the datasource
const sourceUrl = 'https://www.linkedin.com/feed/'

async function getDatasource(id: string) {
  try {
    const res = await fetch(`/api/datasources/${id}`, {
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

export default function DatasourcePage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<Datasource>()

  useEffect(() => {
    getDatasource(id)
      .then(setData)
      .catch((error) => {
        console.error('Failed to fetch datasource:', error)
      })
  }, [id])

  if (!data) {
    return <div className="flex h-screen items-center justify-center text-2xl text-gray-500">Loading...</div>
  }

  return (
    <>
      <div className="relative m-3 flex min-h-screen w-auto flex-col justify-start bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-2 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1> {data.sourceName} </h1>
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
            <button className="flex items-center rounded-md border border-gray-500 bg-transparent px-4 py-2 text-gray-500">
              <PencilIcon className="mr-2 h-5 w-5" />
              Edit Information
            </button>
            <Button color="red">Disable</Button>
            <button color="blue" className="flex items-center bg-transparent text-red-500">
              <TrashIcon className="mr-2 h-5 w-5 text-red-500" />
              Delete
            </button>
          </div>
        </div>
        <p className="mb-1 ml-14 mr-12 text-base text-gray-700">{data.description}</p>
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 ml-14 text-base font-semibold text-gray-900 hover:text-blue-600"
        >
          {sourceUrl}
        </a>
        <div className="mt-1">
          <TabComponent />
        </div>
      </div>
    </>
  )
}
