import React, { useState, useEffect, useContext } from 'react'
import { AreaChart, DateRangePicker } from '@tremor/react'
import { AuthContext } from '@/lib/firebase/auth'
import extractCategories from '@/utils/extractCategories'

async function getAnalyticsData(measurementId: string, companiesArray: string[], idToken: string) {
  const companiesQuery = companiesArray.map((companyId) => `companies=${companyId}`).join('&')
  const response = await fetch(`/api/analytics?measurementId=${measurementId}&${companiesQuery}`, {
    method: 'GET',
    headers: {
      Authorization: idToken
    }
  })

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
}

const GraphChart: React.FC<GraphChartProps> = ({ measurementId, measurementName, companiesArray }) => {
  const [analyticsData, setAnalyticsData] = useState([])
  const [idToken, setIdToken] = useState<string | null>(null)
  const user = useContext(AuthContext)

  useEffect(() => {
    const setToken = async () => {
      if (user) {
        try {
          const token = await user.getIdToken()
          setIdToken(token)
        } catch (error) {
          console.error('Error fetching token:', error)
        }
      }
    }
    setToken()
  }, [user])

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        if (idToken) {
          const data = await getAnalyticsData(measurementId, companiesArray, idToken)
          setAnalyticsData(data)
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }
    fetchAnalyticsData()
  }, [idToken, measurementId, companiesArray])

  console.log('Analytics data:', analyticsData)
  const categories = extractCategories(analyticsData)

  return (
    <div className="mt-2 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="ml-2 text-lg font-semibold text-gray-700">{measurementName}</h1>
        </div>
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
