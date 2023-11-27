'use client'

import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Button } from '@tremor/react'
import { UserGroupIcon, UserIcon } from '@heroicons/react/solid'
import { RefreshIcon } from '@heroicons/react/outline'
import { companyData } from 'src/components/Companies/dummydata'
import GoBackButton from '@/components/Companies/GoBackButton'
import CompanyAttachment from '@/components/Companies/CompanyAttachment'
import DataSourcesPanel from '@/components/Companies/DataSourcesPanel'
import PerformancePanel from '@/components/Companies/PerformancePanel'

const CompanyPage: React.FC = () => {
  const { name, description, attachments } = companyData

  return (
    <div className="m-3 flex flex-col items-start rounded-lg border-0 bg-white p-3 shadow-md">
      <div className="mb-3 flex w-full items-center justify-between space-x-4">
        <div className="flex items-center">
          <div className="pl-2">
            <GoBackButton />
          </div>
          <h1 className="py-2 pl-4 text-4xl font-bold">{name}</h1>
        </div>
        <div className="flex">
          <div className="flex items-center space-x-3">
            <Button variant="primary">Subscribe</Button>
            <Button variant="secondary">Export Data</Button>
          </div>
        </div>
      </div>

      <div className="pl-10 pr-2">
        <p className="mb-4 overflow-hidden text-sm text-gray-700">{description}</p>
        <div className="mt-4">
          <h3 className="pb-2 font-bold">
            You can also attach data to this company that will only be displayed to you
          </h3>
          <Button icon={RefreshIcon}>Attach Data</Button>
          <div className="flex space-x-4 py-4">
            {attachments.map((attachment) => (
              <CompanyAttachment key={attachment.id} attachment={attachment} />
            ))}
          </div>
        </div>

        <TabGroup>
          <TabList className="mt-8" variant="solid">
            <Tab icon={UserGroupIcon}>Data Sources</Tab>
            <Tab icon={UserIcon}>Performance</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataSourcesPanel />
            </TabPanel>
            <TabPanel>
              <PerformancePanel />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}

export default CompanyPage
