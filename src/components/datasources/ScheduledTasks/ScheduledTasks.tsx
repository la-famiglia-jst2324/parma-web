import React from 'react'
import type { ScheduledTask } from '@prisma/client'
import { columns } from './Columns'
import { DataTable } from '@/components/DataTable/Table'

interface ScheduledTasksProps {
  data: ScheduledTask[]
}

const ScheduledTasksTable = ({ data }: ScheduledTasksProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No data available</h1>
        <p className="text-gray-500">No data has been collected yet</p>
      </div>
    )
  }

  return <DataTable data={data} columns={columns} type="schedule" />
}
export default ScheduledTasksTable
