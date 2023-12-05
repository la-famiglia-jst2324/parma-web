'use client'
import type { Company } from '@prisma/client'
import React, { useState, useEffect } from 'react'

async function getCompanies(dataSourceId: string) {
  return fetch(`/api/companyDataSourceRelation?dataSourceId=${dataSourceId}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          console.log('No companies liked to this datasource!')
        }
        console.log(`HTTP error! status: ${response.status}`)
        return null
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

interface CompaniesTableProps {
  datasourceId: string
}

export const CompaniesTable = ({ datasourceId }: CompaniesTableProps) => {
  const [data, setData] = useState<Company[] | undefined>()

  const dataSourceId = datasourceId

  useEffect(() => {
    getCompanies(dataSourceId)
      .then((companies) => {
        setData(companies)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [dataSourceId])

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((company) => (
                  <tr key={company.name}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{company.name}</td>
                    <td className="break-words px-6 py-4 text-sm text-gray-500">{company.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
