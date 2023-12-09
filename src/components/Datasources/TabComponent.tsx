'use client'
import React, { useState } from 'react'
import { TabButton } from '../TabButton'
import { TabContent } from '../TabContent'
import { CompaniesTable } from './CompaniesTable'

export const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('Companies Monitored')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <div className="mb-4 flex border-b-2 border-gray-200">
        <TabButton label="Companies Monitored" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton label="Scraping Information" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton label="Datasource Health" activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <TabContent label="Companies Monitored" activeTab={activeTab}>
        <div className="mt-10">
          <CompaniesTable datasourceId="" />
        </div>
      </TabContent>
      <TabContent label="Scraping Information" activeTab={activeTab}>
        <div className="mt-10"></div>
      </TabContent>
      <TabContent label="Datasource Health" activeTab={activeTab}>
        <div className="mt-10"></div>
      </TabContent>
    </div>
  )
}
