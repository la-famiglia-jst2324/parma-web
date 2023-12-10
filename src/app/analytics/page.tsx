'use client'
import React, { useState } from 'react'
import { MultiSelect, MultiSelectItem, Button, SearchSelectItem, SearchSelect } from '@tremor/react'
import { MainLayout } from '@/components/MainLayout'
import useSubscribedCompanies from '@/components/hooks/useSubscribedCompanies'
import useDatasources from '@/components/hooks/useDatasources'
import UserCustomizationComponent from '@/components/Analytics/UserCustomization'
import RevenueChart from '@/components/Analytics/Graph'

const AnalyticsPage: React.FC = () => {
  const subscribedCompanies = useSubscribedCompanies()
  const { data } = useDatasources(1, 10)

  const [selectedCompanies, setSelectedCompanies] = useState<Array<string>>([])
  const [selectedDatasources, setSelectedDatasources] = useState<string>('')

  return (
    <MainLayout>
      <div className="m-6 flex flex-col items-start rounded-lg border-0 bg-white p-4 shadow-md">
        <UserCustomizationComponent />
        <div className="mb-6">
          <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Compare data across companies</h1>
          <p className="mx-4 mb-4 text-sm text-gray-600">Choose companies and a metric to compare them</p>
          <div className="flex justify-between">
            <div className="ml-2 flex space-x-4">
              <div className="w-1/2">
                <MultiSelect placeholder="Companies" onValueChange={(selected) => setSelectedCompanies(selected)}>
                  {subscribedCompanies.map((companyName, index) => (
                    <MultiSelectItem key={index} value={companyName}>
                      {companyName}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              </div>
              <div className="w-1/2">
                <SearchSelect placeholder="Datasources" onValueChange={(selected) => setSelectedDatasources(selected)}>
                  {data ? (
                    data.map((datasource, index) => (
                      <SearchSelectItem key={index} value={datasource.sourceName}>
                        {datasource.sourceName}
                      </SearchSelectItem>
                    ))
                  ) : (
                    <p>No items available</p>
                  )}
                </SearchSelect>
              </div>
              <Button className="mr-2" disabled={selectedCompanies.length === 0 || selectedDatasources.length === 0}>
                Compare
              </Button>
            </div>
            <div className="ml-4">
              <Button className="mr-2">Save Customization</Button>
            </div>
          </div>
        </div>
        <RevenueChart />
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage
