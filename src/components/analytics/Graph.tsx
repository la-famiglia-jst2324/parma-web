import React, { useState, useEffect, useContext } from 'react'
import type { DateRangePickerValue } from '@tremor/react'
import { AreaChart } from '@tremor/react'
import { AuthContext, getAuthToken } from '@/lib/firebase/auth'
import extractCategories from '@/utils/extractCategories'

interface DataItem {
  date: string
  [key: string]: number | string
}

async function getAnalyticsData(
  measurementId: string,
  companiesArray: string[],
  idToken: string,
  datePickerValue: DateRangePickerValue | null
) {
  const companiesQuery = companiesArray.map((companyId) => `companies=${companyId}`).join('&')
  const response = await fetch(
    `/api/analytics?measurementId=${measurementId}&${companiesQuery}&startDate=${datePickerValue?.from}&endDate=${datePickerValue?.to}`,
    {
      method: 'GET',
      headers: {
        Authorization: idToken
      }
    }
  )

  if (!response.ok) {
    console.error('Response status:', response.status)
    throw new Error('HTTP response was not OK')
  }

  return await response.json()
}

interface GraphChartProps {
  measurementId: string
  measurementName: string
  companiesArray: string[]
  datepickerValue: DateRangePickerValue | null
}

const GraphChart: React.FC<GraphChartProps> = ({ measurementId, measurementName, companiesArray, datepickerValue }) => {
  const [analyticsData, setAnalyticsData] = useState<DataItem[]>([])
  const user = useContext(AuthContext)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const token = await getAuthToken(user)
      if (!token) return
      const data = await getAnalyticsData(measurementId, companiesArray, token, datepickerValue)
      const groupedArray: DataItem[] = []

      data.forEach((item: DataItem) => {
        const existingItem = groupedArray.find((groupedItem) => groupedItem.date === item.date)

        if (existingItem) {
          // Merge the values if the date already exists in the grouped array
          Object.keys(item).forEach((key) => {
            if (key !== 'date') {
              existingItem[key] = (+existingItem[key] || 0) + +item[key]
            }
          })
        } else {
          // Add a new entry if the date doesn't exist in the grouped array
          groupedArray.push({ ...item })
        }
      })

      console.log(groupedArray)
      setAnalyticsData(groupedArray)
    }
    fetchAnalyticsData()
  }, [user, measurementId, companiesArray, datepickerValue])

  const categories = extractCategories(analyticsData)
  return (
    <div className="mt-2 w-full">
      <div>
        <h1 className="ml-2 text-lg font-semibold text-gray-700">{measurementName}</h1>
      </div>
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
