import React from 'react'
import { Card, LineChart, Title } from '@tremor/react'

interface ChartData {
  year: number
  'Export Growth Rate': number
}

const PerformancePanel = () => {
  const valueFormatter = (value: number): string => `$ ${new Intl.NumberFormat('us').format(value).toString()}`

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

  return (
    <div className="mt-4 flex w-full">
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
