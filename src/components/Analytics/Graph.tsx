import React from 'react'
import { AreaChart } from '@tremor/react'

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
    'Third Company': 1234
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
    'Third Company': 2134
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
    'Third Company': 1534
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
    'Third Company': 2234
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
    'Third Company': 1234
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
    'Third Company': 1234
  }
]

const valueFormatter = function (number: number) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString()
}

const categories = Object.keys(chartdata[0]).filter((key) => key !== 'date')

const RevenueChart: React.FC = () => {
  return (
    <div className="mt-2 w-full">
      <h1 className="ml-2 text-lg text-gray-700">Newsletter revenue over time (USD)</h1>
      <AreaChart
        className="mt-2 h-72 w-full"
        data={chartdata}
        index="date"
        categories={categories}
        colors={['indigo', 'cyan', 'pink']}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}

export default RevenueChart
