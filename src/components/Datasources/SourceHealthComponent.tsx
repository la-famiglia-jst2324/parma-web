import React, { useEffect, useState } from 'react'
import { Tracker, ProgressBar } from '@tremor/react'
import type { ScheduledTasks } from '@prisma/client'
import { getScheduledTasks } from '@/app/api/datasources'
import mapTasksToTracker from '@/utils/mapTasksToTracker'
import calculateUptime from '@/utils/calculateUptime'

interface SourceHealthComponentProps {
  datasourceId: string
}

const SourceHealthComponent = ({ datasourceId }: SourceHealthComponentProps) => {
  const [healthData, setHealthData] = useState<ScheduledTasks[]>([])

  useEffect(() => {
    getScheduledTasks(datasourceId)
      .then((scheduledTasks) => {
        setHealthData(scheduledTasks)
      })
      .catch((error) => {
        console.error('Failed to fetch datasources:', error)
      })
  }, [datasourceId])

  if (!healthData) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  const trackerData = mapTasksToTracker(healthData)
  const uptime = calculateUptime(healthData)

  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-3xl font-semibold text-gray-700">Overall Health</h1>
      <div className="space-y-4">
        <div>
          <p className="font-medium text-gray-700">Uptime: {uptime}%</p>
          <ProgressBar value={uptime} />
        </div>
        <div className="mt-4">
          <Tracker data={trackerData} className="mt-2" />
        </div>
      </div>
    </div>
  )
}

export default SourceHealthComponent
