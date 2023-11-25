import React, { useState } from 'react'
import { CompaniesTable } from './CompaniesTable'

export const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('Companies Monitored')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <div className="mb-4 flex border-b-2 border-gray-200">
        <button
          className={`grow border-b-4 py-2 text-center ${
            activeTab === 'Companies Monitored' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
          } hover:text-blue-500`}
          onClick={() => handleTabClick('Companies Monitored')}
        >
          Companies Monitored
        </button>
        <button
          className={`grow border-b-4 py-2 text-center ${
            activeTab === 'Scraping Information' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
          } hover:text-blue-500`}
          onClick={() => handleTabClick('Scraping Information')}
        >
          Scraping Information
        </button>
        <button
          className={`grow border-b-4 py-2 text-center ${
            activeTab === 'Datasource Health' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
          } hover:text-blue-500`}
          onClick={() => handleTabClick('Datasource Health')}
        >
          Datasource Health
        </button>
      </div>
      {activeTab === 'Companies Monitored' && (
        <div className="mt-4 rounded-md bg-white p-4">
          <h2 className="mb-3 text-2xl font-semibold text-gray-600">Companies Monitored by this Datasource</h2>
          <CompaniesTable />
        </div>
      )}
      {activeTab === 'Scraping Information' && (
        <div className="mt-4 rounded-md bg-white p-4">
          <div className="mt-10"></div>
        </div>
      )}
      {activeTab === 'Datasource Health' && (
        <div className="mt-4 rounded-md bg-white p-4">
          <div className="mt-10"></div>
        </div>
      )}
    </div>
  )
}
