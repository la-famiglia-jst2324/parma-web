'use client'
import React, { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import type { DateRangePickerValue } from '@tremor/react'
import { DateRangePicker } from '@tremor/react'
import GraphChart from '@/components/analytics/Graph'
import { useMeasurementsCompanies } from '@/components/hooks/useMetrics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function BucketGraph({ companies }: { companies: Company[] | undefined }) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>('')
  const [datePickerValue, setDatePickerValue] = useState<DateRangePickerValue>()
  const [graphData, setGraphData] = useState<{
    companies: string[]
    metric: string
  }>()

  useEffect(() => {
    if (companies) {
      setSelectedCompanies(companies.map((company) => company.id.toString()))
    }
  }, [companies])

  useEffect(() => {
    if (selectedMetric) {
      setGraphData({ companies: selectedCompanies, metric: selectedMetric })
    }
  }, [selectedMetric])

  const metrics = useMeasurementsCompanies(selectedCompanies)

  const changeDatePicker = (value: DateRangePickerValue) => {
    if (value.from && value.to) {
      setDatePickerValue(value)
    }
  }
  const metricName = metrics.find((metric) => metric.id.toString() === selectedMetric)?.measurementName
  return (
    <main className="m-4 flex flex-row items-start justify-start" role="main">
      {metrics && (
        <div className="flex w-full flex-col items-start shadow-md">
          <div className="mb-6">
            <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Compare</h1>
            <div className="flex justify-between">
              <div className="ml-2 flex space-x-4">
                <div className="flex w-1/2 flex-row gap-4">
                  <Select
                    onValueChange={(selectedName) => {
                      setSelectedMetric(selectedName)
                    }}
                    value={selectedMetric}
                  >
                    <SelectTrigger className="min-w-[10rem]">
                      <SelectValue placeholder="Metrics" />
                    </SelectTrigger>
                    <SelectContent>
                      {metrics ? (
                        metrics.map((metric, index) => (
                          <SelectItem key={index} value={metric.id.toString()}>
                            {metric.measurementName}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="null" className="px-2 py-1 text-sm text-slate-600">
                          No metrics available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <DateRangePicker onValueChange={(value) => changeDatePicker(value)} />
                </div>
              </div>
            </div>
          </div>
          <div></div>
          {graphData ? (
            <GraphChart
              measurementId={graphData.metric || ''}
              companiesArray={graphData.companies}
              measurementName={metricName || ''}
              datepickerValue={datePickerValue || null}
            />
          ) : (
            <p className="ml-4">Please select a metric to compare.</p>
          )}
        </div>
      )}
    </main>
  )
}

export default BucketGraph
