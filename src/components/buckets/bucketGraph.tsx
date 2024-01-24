'use client'
import React, { useEffect, useState } from 'react'
import type { Company } from '@prisma/client'
import { CalendarIcon } from 'lucide-react'
import { format, subDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import GraphChart from '@/components/analytics/Graph'
import { useMeasurementsCompanies } from '@/components/hooks/useMetrics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

  const changeDatePicker = (value: DateRange | undefined) => {
    console.log(value)
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
            <h1 className="mb-2 text-2xl font-semibold text-gray-700">Compare</h1>
            <div className="flex justify-between">
              <div className="flex">
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
            <GraphChart
              measurementId={graphData.metric || ''}
              companiesArray={graphData.companies}
              measurementName={metricName || ''}
              datepickerValue={datePickerValue || null}
            />
          ) : (
            <p className="ml-2">Please select a metric to compare.</p>
          )}
        </div>
      )}
    </main>
  )
}

export default BucketGraph
