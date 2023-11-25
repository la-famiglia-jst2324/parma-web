import React from 'react'
import { Button } from '@tremor/react'
import { TabComponent } from '@/components/Datasources/TabComponent'
import GoBackButton from '@/components/Datasources/GoBackButton'

function DatasourcePage() {
  return (
    <>
      <div className="relative m-5 flex min-h-screen w-auto flex-col justify-start bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="mb-3 flex items-center justify-start space-x-4">
            <GoBackButton />
            <h1>Datasource</h1>
            <h2>Status</h2>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <Button color="gray">Edit Information</Button>
            <Button color="red">Enable</Button>
            <Button color="blue">Delete</Button>
          </div>
        </div>
        <div className="p-14">
          <p className="mb-2 text-lg text-gray-700">
            {/* Placeholder for real datasource description */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus various. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus various.
          </p>
          <p className="mb-2 text-lg text-gray-700">
            {/* Placeholder for real datasource URL */}
            URL: https://www.linkedin.com/feed/
          </p>
        </div>
        <div>
          <TabComponent />
        </div>
      </div>
    </>
  )
}

export default DatasourcePage
