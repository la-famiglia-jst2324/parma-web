import React, { useState, useEffect } from 'react'
import type { ScheduledTask } from '@prisma/client'
import { Badge } from '@tremor/react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../ui/table'
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task ID</TableHead>
          <TableHead>Schedule Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Scheduled At</TableHead>
          <TableHead>Started At</TableHead>
          <TableHead>Ended At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task, index) => (
          <TableRow key={index}>
            <TableCell>{task.taskId}</TableCell>
            <TableCell>{task.scheduleType.toLocaleLowerCase()}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{formatDate(task.scheduledAt)}</TableCell>
            <TableCell>{formatDate(task.startedAt)}</TableCell>
            <TableCell>{formatDate(task.endedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ScheduledTasksTable
