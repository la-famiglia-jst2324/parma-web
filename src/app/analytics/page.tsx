'use client'
import React from 'react'
import { MultiSelect, MultiSelectItem, AreaChart } from '@tremor/react'
import { MainLayout } from '@/components/MainLayout'
import useSubscribedCompanies from '@/components/hooks/useSubscribedCompanies'
import useDatasources from '@/components/hooks/useDatasources'

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726
  }
]

const valueFormatter = function (number: number) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString()
}

const AnalyticsPage: React.FC = () => {
  const subscribedCompanies = useSubscribedCompanies()
  const { data } = useDatasources(1, 10)
  const userCustomizations: { title: string; source: string }[] = []

  return (
    <MainLayout>
      <div className="m-6 flex flex-col items-start rounded-lg border-0 bg-white p-4 shadow-md">
        <div className="mb-6">
          <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Your saved Customizations</h1>
          {userCustomizations && userCustomizations.length > 0 ? (
            userCustomizations.map((customization, index) => (
              <div key={index}>
                <p className="mx-4 text-sm text-gray-600">Choose a customization to view</p>
                <div>
                  <p>{customization.title}</p>
                  <p>{customization.source}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="mx-4 text-sm text-gray-600">
              You haven't saved any customization yet. Select the companies and datasources on the graph below and save
              your selections.{' '}
            </p>
          )}
        </div>
        <div className="mb-6">
          <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Compare data across companies</h1>
          <p className="mx-4 mb-4 text-sm text-gray-600">Choose companies and a metric to compare them</p>
          <div className="flex space-x-4">
            <div className="w-3/4">
              <MultiSelect placeholder="Companies" onValueChange={() => {}}>
                {subscribedCompanies.map((companyName, index) => (
                  <MultiSelectItem key={index} value={companyName}>
                    {companyName}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>
            <div className="w-3/4">
              <MultiSelect placeholder="Datasources" onValueChange={() => {}}>
                {data ? (
                  data.map((datasource, index) => (
                    <MultiSelectItem key={index} value={datasource.sourceName}>
                      {datasource.sourceName}
                    </MultiSelectItem>
                  ))
                ) : (
                  <p>No items available</p>
                )}
              </MultiSelect>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <h1 className="ml-2 text-lg text-gray-700">Newsletter revenue over time (USD)</h1>
          <AreaChart
            className="mt-2 h-72 w-full"
            data={chartdata}
            index="date"
            categories={['SemiAnalysis', 'The Pragmatic Engineer']}
            colors={['indigo', 'cyan']}
            valueFormatter={valueFormatter}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage
