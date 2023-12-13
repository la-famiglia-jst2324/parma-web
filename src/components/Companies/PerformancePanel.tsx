import { Button, Card, LineChart, SearchSelect, SearchSelectItem, Title } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { getDataSourcesByCompanyId } from '@/services/datasource/datasourceService'

interface ChartData {
  year: number
  'Export Growth Rate': number
}

interface Props {
  companyId: string
}

interface CompanyDataSource {
  id: number
  sourceName: string
  isActive: boolean
  defaultFrequency: string
  frequencyPattern: null | string
  healthStatus: string
  description: null | string
  createdAt: string
  modifiedAt: string
  version: string
  maximumExpectedRunTime: number
  invocationEndpoint: string
  additionalParams: null | string
}

const chartdata: ChartData[] = [
  {
    year: 1970,
    'Export Growth Rate': 2.04
  },
  {
    year: 1971,
    'Export Growth Rate': 0.55
  },
  {
    year: 1972,
    'Export Growth Rate': 0.23
  },
  {
    year: 1973,
    'Export Growth Rate': 3.23
  },
  {
    year: 1974,
    'Export Growth Rate': 1.88
  },
  {
    year: 1975,
    'Export Growth Rate': 0.92
  },
  {
    year: 1976,
    'Export Growth Rate': 2.78
  },
  {
    year: 1977,
    'Export Growth Rate': 1.45
  },
  {
    year: 1978,
    'Export Growth Rate': 0.67
  },
  {
    year: 1979,
    'Export Growth Rate': 3.12
  },
  {
    year: 1980,
    'Export Growth Rate': 0.33
  },
  {
    year: 1981,
    'Export Growth Rate': 1.76
  },
  {
    year: 1982,
    'Export Growth Rate': 0.88
  },
  {
    year: 1983,
    'Export Growth Rate': 1.99
  },
  {
    year: 1984,
    'Export Growth Rate': 2.45
  },
  {
    year: 1985,
    'Export Growth Rate': 1.32
  }
]

const PerformancePanel: React.FC<Props> = ({ companyId }) => {
  const [companyDataSources, setCompanyDataSources] = useState<CompanyDataSource[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datasource, setDatasource] = useState<string>('')

  const valueFormatter = (value: number): string => `$ ${new Intl.NumberFormat('us').format(value).toString()}`

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

  const handleDatasourceChange = (value: string) => {
    setDatasource(value)
  }

  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="mb-3 flex w-full flex-row space-x-3">
        <SearchSelect onValueChange={handleDatasourceChange} placeholder={'Select datasources'}>
          {companyDataSources?.map((datasource: CompanyDataSource, index) => (
            <SearchSelectItem key={index} value={String(datasource.id)}>
              {datasource.sourceName}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        <Button onClick={() => {}}>Show Data</Button>
      </div>
      <Card>
        <Title>Wikipedia</Title>
        <LineChart
          className="mt-6"
          data={chartdata}
          index="year"
          categories={['Export Growth Rate']}
          colors={['emerald']}
          valueFormatter={valueFormatter}
          yAxisWidth={40}
        />
      </Card>
    </div>
  )
}

export default PerformancePanel
