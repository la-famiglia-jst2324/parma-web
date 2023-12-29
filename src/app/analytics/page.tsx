'use client'
import React, { useState } from 'react'
import { MultiSelect, MultiSelectItem, Button, SearchSelectItem, SearchSelect } from '@tremor/react'
import UserCustomizationComponent from '@/components/analytics/UserCustomization'
import GraphChart from '@/components/analytics/Graph'
import useCompanies from '@/components/hooks/useCompanies'
import { useMeasurementsCompanies } from '@/components/hooks/useMetrics'
import { MainLayoutWrapper } from '@/components/layout/MainLayout'

const AnalyticsPage: React.FC = () => {
  const companies = useCompanies()

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

  const metrics = useMeasurementsCompanies(selectedCompanies)

  const metricName = metrics.find((metric) => metric.id.toString() === selectedMetric)?.measurementName

  return (
    <main className="m-4 flex h-[68em] flex-row items-start justify-start space-x-4" role="main">
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
                  {companies && companies.length > 0 ? (
                    companies.map((company, index) => (
                      <MultiSelectItem key={index} value={company.id.toString()}>
                        {company.name}
                      </MultiSelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1 text-sm text-slate-600">No companies available</div>
                  )}
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
                    <div className="px-2 py-1 text-sm text-slate-600">No metrics available</div>
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
            measurementName={metricName || ''}
          />
        ) : (
          <p className="ml-4">Please select companies and a metric to compare.</p>
        )}
      </div>
    </main>
  )
}

export default MainLayoutWrapper(AnalyticsPage)
