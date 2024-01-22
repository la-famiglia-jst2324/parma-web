import React, { useContext, useEffect, useState } from 'react'
import { LineChart, SearchSelect, SearchSelectItem } from '@tremor/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { CompanyContextProps } from '../CompanyContext'
import { CompanyContext } from '../CompanyContext'
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

const CompanyGraphCard: React.FC<CompanyGraphCardProps> = ({ companyId, measurements }) => {
  const [graphData, setGraphData] = useState<DataItem[]>([])
  const { companyData } = useContext(CompanyContext) as CompanyContextProps
  const defaultMeasurement = String(measurements[0]?.id)

  const handleMeasurementChange = async (value: string) => {
    try {
      const data = await getAnalyticsDataForCompany(value, companyId)
      setGraphData(data)
    } catch (error) {
      console.error('Failed to get the measurement data', error)
    }
  }

  useEffect(() => {
    handleMeasurementChange(defaultMeasurement)
  }, [defaultMeasurement, companyId])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Graph</CardTitle>
          <SearchSelect
            onValueChange={handleMeasurementChange}
            placeholder={'Select graph measurement'}
            className="w-96"
            value={defaultMeasurement}
            enableClear={false}
          >
            {measurements?.map((measurement, index) => (
              <SearchSelectItem key={index} value={String(measurement.id)}>
                {measurement.measurementName}
              </SearchSelectItem>
            ))}
          </SearchSelect>
        </div>
      </CardHeader>
      <CardContent>
        <LineChart
          className="mt-6"
          data={graphData}
          index="date"
          categories={[companyData?.name]}
          colors={['emerald']}
          yAxisWidth={40}
        />
      </CardContent>
    </Card>
  )
}

export default CompanyGraphCard
