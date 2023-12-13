import React, { useState, useEffect } from 'react'
import { AreaChart, DateRangePicker } from '@tremor/react'
import type { Company } from '@/types/companies'

async function getAnalyticsData(measurementId: string, companiesArray: Company[]) {
  const response = await fetch(
    `/api/path/to/endpoint?measurementId=${measurementId}&companiesArray=${companiesArray}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data
}

interface GraphChartProps {
  measurementId: number
  companiesArray: Company[]
}

const GraphChart: React.FC<GraphChartProps> = ({ measurementId, companiesArray }) => {
  const [analyticsData, setAnalyticsData] = useState([])

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const data = await getAnalyticsData(measurementId.toString(), companiesArray)
      setAnalyticsData(data)
    }

    fetchAnalyticsData()
  }, [])

  const categories = analyticsData.length > 0 ? Object.keys(analyticsData[0]).filter((key) => key !== 'date') : []

  return (
    <div className="mt-2 w-full">
      <div className="flex items-center justify-between">
        <h1 className="ml-2 text-lg text-gray-700">Newsletter revenue over time (USD)</h1>
        <DateRangePicker />
      </div>
      <AreaChart
        className="mt-2 h-72 w-full"
        data={analyticsData}
        index="date"
        categories={categories}
        colors={['indigo', 'cyan', 'pink']}
      />
    </div>
  )
}

export default GraphChart
