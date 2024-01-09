import React, { useState, useEffect } from 'react'
import type { ScheduledTask } from '@prisma/client'
import { Badge } from '@tremor/react'
import { getScheduledTasks } from '@/services/datasource/datasourceService'
import formatDate from '@/utils/formatDate'

interface ScheduledTasksProps {
  datasourceId: string
}

const ScheduledTasksTable = ({ datasourceId }: ScheduledTasksProps) => {
  const [data, setData] = useState<ScheduledTask[] | undefined>()

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
    <div className="rounded-lg bg-transparent p-6 shadow">
      <h1 className="mb-4 text-3xl font-semibold text-gray-700">Scheduled Tasks</h1>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 rounded-lg bg-white shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">Task ID</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">
                Schedule Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">
                Scheduled At
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">
                Started At
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-600">Ended At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{task.taskId}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{task.scheduleType.toLocaleLowerCase()}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  <Badge
                    color={
                      task.status === 'PENDING'
                        ? 'gray'
                        : task.status === 'SUCCESS'
                        ? 'green'
                        : task.status === 'FAILED'
                        ? 'red'
                        : 'yellow'
                    }
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{formatDate(task.scheduledAt)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{formatDate(task.startedAt)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">{formatDate(task.endedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ScheduledTasksTable
