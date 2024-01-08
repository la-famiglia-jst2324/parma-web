import { Card, LineChart, SearchSelect, SearchSelectItem } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { getDataSourcesByCompanyId } from '@/services/datasource/datasourceService'
import { getAnalyticsDataForCompany, getMeasurements } from '@/services/measurement/measurementService'
import { Button } from '@/components/ui/button'

interface Props {
  companyId: string
  companyName: string
}

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  frequency: string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maxRunSeconds: number
  invocationEndpoint: string
  additionalParams: null | string
}

interface CompanyMeasurement {
  id: number
  createdAt: string
  measurementName: string
  modifiedAt: string
  parentMeasurementId: number | null
  sourceModuleId: number
  type: string
}

const PerformancePanel: React.FC<Props> = ({ companyId, companyName }) => {
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  const [companyMeasurements, setCompanyMeasurements] = useState<CompanyMeasurement[]>([])
  const [datasource, setDatasource] = useState<string>('')
  const [measurement, setMeasurement] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [graphData, setGraphData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSourcesByCompanyId(companyId)
        setCompanyDataSources(data)
      } catch (error) {
        console.error('Failed to fetch data sources:', error)
      }
    }

    fetchData()
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeasurements()
        setCompanyMeasurements(data)
      } catch (error) {
        console.error('Failed to fetch data sources:', error)
      }
    }

    fetchData()
  }, [companyId])

  const handleDatasourceChange = (value: string) => {
    setDatasource(value)
  }

  const handleMeasurementChange = (value: string) => {
    setMeasurement(value)
  }

  const handleGetMeasurementData = async () => {
    try {
      const data = await getAnalyticsDataForCompany(measurement, companyId)
      setGraphData(data)
    } catch (error) {
      console.error('Failed to get the measurement data', error)
    }
  }

  const handleRefetchDatasources = async () => {
    try {
      const data = await getDataSourcesByCompanyId(companyId)
      setCompanyDataSources(data)
    } catch (error) {
      console.error('Failed to fetch data sources:', error)
    }
  }

  return (
    <div className="my-4 flex w-full flex-col">
      <div className="mb-3 flex w-full flex-row space-x-3">
        <SearchSelect onValueChange={handleDatasourceChange} placeholder={'Select datasources'}>
          {companyDataSources?.map((datasource: CompanyDataSource, index) => (
            <SearchSelectItem key={index} value={String(datasource.id)}>
              {datasource.sourceName}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        <SearchSelect
          onValueChange={handleMeasurementChange}
          placeholder={'Select measurement'}
          disabled={datasource === ''}
        >
          {companyMeasurements?.map((measurement: CompanyMeasurement, index) => (
            <SearchSelectItem key={index} value={String(measurement.id)}>
              {measurement.measurementName}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        <Button onClick={handleGetMeasurementData} variant={'secondary'}>
          Show Data
        </Button>
        <Button variant="secondary" onClick={handleRefetchDatasources}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
      <Card>
        <LineChart
          className="mt-6"
          data={graphData}
          index="date"
          categories={[companyName]}
          colors={['emerald']}
          yAxisWidth={40}
        />
      </Card>
    </div>
  )
}

export default PerformancePanel
