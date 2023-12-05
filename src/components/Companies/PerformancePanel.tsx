'use client'

import React from 'react'
import { CalculatorIcon } from '@heroicons/react/outline'
import { Card, LineChart, Title, Select, SelectItem, Button } from '@tremor/react'

const PerformancePanel = () => {
  // const [datasources, setDatasources] = useState<string[]>([])
  // const [metrics, setMetrics] = useState<string[]>([])
  // const [selectedDatasource, setSelectedDatasource] = useState('')
  // const [selectedMetric, setSelectedMetric] = useState('')

  const valueFormatter = (value: number): string => `$ ${new Intl.NumberFormat('us').format(value).toString()}`

  const chartdata = [
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
    // Add more years and export growth rates as needed
  ]

  return (
    <div className="mt-4">
      <div className="flex space-x-4">
        <Select value={''} onValueChange={() => {}}>
          <SelectItem value="1" icon={CalculatorIcon}>
            Kilometers
          </SelectItem>
          <SelectItem value="2" icon={CalculatorIcon}>
            Meters
          </SelectItem>
          <SelectItem value="3" icon={CalculatorIcon}>
            Miles
          </SelectItem>
          <SelectItem value="4" icon={CalculatorIcon}>
            Nautical Miles
          </SelectItem>
        </Select>
        <Select value={''} onValueChange={() => {}}>
          <SelectItem value="1" icon={CalculatorIcon}>
            Kilometers
          </SelectItem>
          <SelectItem value="2" icon={CalculatorIcon}>
            Meters
          </SelectItem>
          <SelectItem value="3" icon={CalculatorIcon}>
            Miles
          </SelectItem>
          <SelectItem value="4" icon={CalculatorIcon}>
            Nautical Miles
          </SelectItem>
        </Select>
        <Button>Show Data</Button>
      </div>
      <div className="mt-4">
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
    </div>
  )
}

export default PerformancePanel
