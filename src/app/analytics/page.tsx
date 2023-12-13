'use client'
import React, { useState } from 'react'
import { MultiSelect, MultiSelectItem, Button, SearchSelectItem, SearchSelect } from '@tremor/react'
import { MainLayout } from '@/components/MainLayout'
import UserCustomizationComponent from '@/components/Analytics/UserCustomization'
import GraphChart from '@/components/Analytics/Graph'
import AuthCheck from '@/components/Authentication/AuthCheck'
import useMeasurements from '@/components/hooks/useMetrics'
import useCompanies from '@/components/hooks/useCompanies'

const AnalyticsPage: React.FC = () => {
  const companies = useCompanies()
  const metrics = useMeasurements()

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>('')
  const [graphData, setGraphData] = useState<{
    companies: string[]
    metric: string
  }>()

  const handleCompareClick = () => {
    if (selectedMetric) {
      setGraphData({ companies: selectedCompanies, metric: selectedMetric })
    }
  }

  const metricName = metrics.filter((metric) => metric.id.toString() === selectedMetric)[0]?.measurementName
  const sourceModuleId = metrics.filter((metric) => metric.id.toString() === selectedMetric)[0]?.sourceModuleId

  return (
    <MainLayout>
      <div
        className="m-6 flex flex-col items-start rounded-lg border-0 bg-white p-4 shadow-md"
        style={{ minHeight: 'calc(100vh - 2rem)' }}
      >
        <UserCustomizationComponent />
        <div className="mb-6">
          <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Compare data across companies</h1>
          <p className="mx-4 mb-4 text-sm text-gray-600">Choose companies and a metric to compare them</p>
          <div className="flex justify-between">
            <div className="ml-2 flex space-x-4">
              <div className="w-1/2">
                <MultiSelect
                  placeholder="Companies"
                  onValueChange={(selectedNames) => {
                    setSelectedCompanies(selectedNames)
                  }}
                  value={selectedCompanies}
                >
                  {companies.map((company, index) => (
                    <MultiSelectItem key={index} value={company.id.toString()}>
                      {company.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              </div>
              <div className="w-1/2">
                <SearchSelect
                  placeholder="Metrics"
                  onValueChange={(selectedName) => {
                    setSelectedMetric(selectedName)
                  }}
                  value={selectedMetric}
                  disabled={selectedCompanies.length === 0}
                >
                  {metrics ? (
                    metrics.map((metric, index) => (
                      <SearchSelectItem key={index} value={metric.id.toString()}>
                        {metric.measurementName}
                      </SearchSelectItem>
                    ))
                  ) : (
                    <p>No items available</p>
                  )}
                </SearchSelect>
              </div>
              <Button onClick={handleCompareClick} disabled={selectedCompanies.length === 0 || !selectedMetric}>
                Compare
              </Button>
            </div>
            <div className="ml-4">
              <Button className="mr-2">Save Customization</Button>
            </div>
          </div>
        </div>
        <div></div>
        {graphData ? (
          <GraphChart
            measurementId={graphData.metric || ''}
            companiesArray={graphData.companies}
            measurementName={metricName}
            sourceModuleId={sourceModuleId.toString()}
          />
        ) : (
          <p className="ml-4">Please select companies and a metric to compare.</p>
        )}
      </div>
    </MainLayout>
  )
}

export default AuthCheck(AnalyticsPage)
