import React, { useContext, useEffect, useState } from 'react'
import { LineChart } from '@tremor/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CompanyContext } from '../CompanyContext'
import type { CompanyContextProps } from '../CompanyContext'
import NestedDropDown from './NestedDropDown'
import { getAnalyticsDataForCompany } from '@/services/measurement/measurementService'

interface CompanyMeasurement {
  id: number
  companyId: number
  createdAt: string
  measurementName: string
  modifiedAt: string
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
}

interface CompanyGraphCardProps {
  companyId: string
  measurements: CompanyMeasurement[]
}

interface DataItem {
  date: string
  [key: string]: number | string
}

const CompanyGraphCard: React.FC<CompanyGraphCardProps> = ({ companyId, measurements = [] }) => {
  const [graphData, setGraphData] = useState<DataItem[]>([])
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>(measurements[0]?.measurementName || '')
  const { companyData } = useContext(CompanyContext) as CompanyContextProps
  const defaultMeasurement = measurements[0]

  const handleMeasurementChange = async (value: string, measurementName: string) => {
    try {
      const data = await getAnalyticsDataForCompany(value, companyId)
      setGraphData(data)
      setSelectedMeasurement(measurementName)
    } catch (error) {
      console.error('Failed to get the measurement data:', error)
    }
  }

  useEffect(() => {
    const measurementId = defaultMeasurement?.id
    if (measurementId) {
      handleMeasurementChange(String(measurementId), defaultMeasurement?.measurementName || '')
    } else {
      setGraphData([])
    }
  }, [defaultMeasurement?.id])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Graph</CardTitle>
            <p className="text-sm">Selected Measurement: {selectedMeasurement}</p>
          </div>
          <NestedDropDown measurements={measurements} handleChange={handleMeasurementChange} />
        </div>
      </CardHeader>
      <CardContent>
        <LineChart
          className="mt-6"
          data={graphData}
          index="date"
          categories={[companyData?.name || '']}
          colors={['emerald']}
          yAxisWidth={40}
        />
      </CardContent>
    </Card>
  )
}

export default CompanyGraphCard
