'use client'
import React, { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import { CalendarIcon } from 'lucide-react'
import { format, subDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import NestedDropDown from '../companies/NestedDropDown'
import GraphChart from '@/components/analytics/Graph'
import { useMeasurementsCompanies } from '@/components/hooks/useMetrics'
import { cn } from '@/utils/utils'

function BucketGraph({ companies }: { companies: Company[] | undefined }) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>('')
  const [datePickerValue, setDatePickerValue] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })
  const [graphData, setGraphData] = useState<{
    companies: string[]
    metric: string
  }>()

  useEffect(() => {
    if (companies && companies.length) {
      setSelectedCompanies(companies?.map((company) => company.id.toString()))
    }
  }, [companies])

  useEffect(() => {
    if (selectedMetric) {
      setGraphData({ companies: selectedCompanies, metric: selectedMetric })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetric])

  const metrics = useMeasurementsCompanies(selectedCompanies).filter((metric) =>
    ['int', 'float', 'nested'].includes(metric.type.toLowerCase())
  )

  const changeDatePicker = (value: DateRange | undefined) => {
    if (value?.from && value?.to) {
      setDatePickerValue(value)
    }
  }
  const metricName = metrics.find((metric) => metric.id.toString() === selectedMetric)?.measurementName
  return (
    <main className="flex flex-row items-start justify-start" role="main">
      {metrics && (
        <div className="flex w-full flex-col items-start shadow-md">
          <div className="mb-6">
            <Label className="text-gray-300">Please select a metric to compare companies</Label>
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex w-1/2 flex-row gap-4">
                  <NestedDropDown measurements={metrics} handleChange={(val) => setSelectedMetric(val)} />
                  <div className={cn('grid gap-2')}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !datePickerValue && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {datePickerValue?.from ? (
                            datePickerValue.to ? (
                              <>
                                {format(datePickerValue.from, 'LLL dd, y')} - {format(datePickerValue.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(datePickerValue.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={datePickerValue?.from}
                          selected={datePickerValue}
                          onSelect={(val) => changeDatePicker(val)}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          {graphData ? (
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Graph</CardTitle>
                    <p className="text-sm">Selected Measurement: {metricName}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <GraphChart
                  measurementId={graphData.metric || ''}
                  companiesArray={graphData.companies}
                  datepickerValue={datePickerValue || null}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="flex h-96 w-full flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">No data to display</h1>
              <p className="text-gray-500">Please select a metric to compare companies</p>
            </Card>
          )}
        </div>
      )}
    </main>
  )
}

export default BucketGraph
