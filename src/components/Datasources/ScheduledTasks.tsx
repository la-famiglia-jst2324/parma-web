import React, { useState, useEffect } from 'react'
import type { ScheduledTasks } from '@prisma/client'

async function getScheduledTasks(dataSourceId: string) {
  return fetch(`/api/dataSources/scheduledTasks/${dataSourceId}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          console.log('No companies linked to this datasource!')
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

interface ScheduledTasksProps {
  datasourceId: string
}

const ScheduledTasksTable = ({ datasourceId }: ScheduledTasksProps) => {
  const [data, setData] = useState<ScheduledTasks[] | undefined>()

  useEffect(() => {
    getScheduledTasks(datasourceId)
      .then((scheduledTasks) => {
        setData(scheduledTasks)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [datasourceId])

  console.log('data: ', data)

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-semibold">Scheduled Tasks</h1>
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Task ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Data Source ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Schedule Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Result Summary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Started At
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((task, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4">{task.taskId}</td>
              <td className="whitespace-nowrap px-6 py-4">{task.dataSourceId}</td>
              <td className="whitespace-nowrap px-6 py-4">{task.scheduleType.toLowerCase()}</td>
              <td className="whitespace-nowrap px-6 py-4">{task.status.toLowerCase()}</td>
              <td className="whitespace-nowrap px-6 py-4">{task.resultSummary}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {new Date(task.startedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ScheduledTasksTable
