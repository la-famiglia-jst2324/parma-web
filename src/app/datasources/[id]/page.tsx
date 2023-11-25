'use client'
import React from 'react'
import { Button } from '@tremor/react'
import { TrashIcon, PencilIcon, StatusOnlineIcon } from '@heroicons/react/outline'
import { useParams } from 'next/navigation'
import { TabComponent } from '@/components/Datasources/TabComponent'
import GoBackButton from '@/components/Datasources/GoBackButton'
// import { useEffect, useState } from 'react';

function DatasourcePage() {
  const sourceId = useParams().id

  /* This code will be used later when making API calls to fetch datasource data */
  // const [datasource, setDatasource] = useState(null);
  // useEffect(() => {
  //   if (sourceId) {
  //     fetch(`/api/datasource/${sourceId}`)
  //       .then(response => response.json())
  //       .then(data => setDatasource(data))
  //       .catch(error => console.error('Error:', error));
  //   }
  // }, [sourceId]);

  return (
    <>
      <div className="relative m-3 flex min-h-screen w-auto flex-col justify-start bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-2 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1>Datasource {sourceId}</h1>
            <div className="inline-flex items-center rounded-full bg-blue-200 px-2 py-1 text-sm text-blue-700">
              <StatusOnlineIcon className="mr-2 h-5 w-5" />
              Active
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
        <p className="mb-1 ml-14 mr-12 text-base text-gray-700">
          {/* Placeholder for real datasource description */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus various. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed vitae diam eget risus various.
        </p>
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 ml-14 text-base font-semibold text-gray-900 hover:text-blue-600"
        >
          {/* Placeholder for real datasource URL */}
          https://www.linkedin.com/feed/
        </a>
        <div className="mt-1">
          <TabComponent />
        </div>
      </div>
    </>
  )
}

export default DatasourcePage
