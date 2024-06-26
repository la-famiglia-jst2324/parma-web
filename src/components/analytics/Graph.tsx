import React, { useState, useEffect } from 'react'
import type { DateRangePickerValue } from '@tremor/react'
import { AreaChart } from '@tremor/react'
import extractCategories from '@/utils/extractCategories'
import fetchClient from '@/services/fetchClient'

interface DataItem {
  date: string
  [key: string]: number | string
}

async function getAnalyticsData(
  measurementId: string,
  companiesArray: string[],
  datePickerValue: DateRangePickerValue | null
) {
  const companiesQuery = companiesArray.map((companyId) => `companies=${companyId}`).join('&')
  const response = await fetchClient(
    `/api/analytics?measurementId=${measurementId}&${companiesQuery}&startDate=${datePickerValue?.from}&endDate=${datePickerValue?.to}`,
    {
      method: 'GET'
    }
  )

  if (response.status !== 200) {
    console.error('Response status:', response.status)
    throw new Error('HTTP response was not OK')
  }

  return await response.data
}

interface GraphChartProps {
  measurementId: string
  companiesArray: string[]
  datepickerValue: DateRangePickerValue | null
}

const GraphChart: React.FC<GraphChartProps> = ({ measurementId, companiesArray, datepickerValue }) => {
  const [analyticsData, setAnalyticsData] = useState<DataItem[]>([])

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const data = await getAnalyticsData(measurementId, companiesArray, datepickerValue)
      const groupedArray: DataItem[] = []

      data.forEach((item: DataItem) => {
        const existingItem = groupedArray.find((groupedItem) => groupedItem.date === item.date)

        if (existingItem) {
          Object.keys(item).forEach((key) => {
            if (key !== 'date') {
              existingItem[key] = (+existingItem[key] || 0) + +item[key]
            }
          })
        } else {
          groupedArray.push({ ...item })
        }
      })

      setAnalyticsData(groupedArray)
    }
    fetchAnalyticsData()
  }, [measurementId, companiesArray, datepickerValue])

  const categories = extractCategories(analyticsData)
  return (
    <div className="mt-2 w-full">
      <AreaChart
        className="mt-2 h-72 w-full"
        data={analyticsData}
        index="date"
        categories={categories}
        colors={['indigo', 'cyan', 'pink', 'blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray']}
      />
    </div>
  )
}

export default GraphChart
