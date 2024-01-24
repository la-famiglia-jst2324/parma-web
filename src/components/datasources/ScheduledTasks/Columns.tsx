import type { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import type { ScheduledTask } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import formatDate from '@/utils/formatDate'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<ScheduledTask>[] = [
  {
    accessorKey: 'taskId',
    header: 'Task ID',
    cell: ({ row }) => <div>{row.getValue('taskId')}</div>
  },
  {
    accessorKey: 'scheduleType',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Schedule Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: Row<ScheduledTask> }) => {
      const scheduleType = row.getValue('scheduleType') as string
      return <div>{scheduleType.toLocaleLowerCase()}</div>
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const color =
        status === 'PENDING' ? 'gray' : status === 'SUCCESS' ? 'green' : status === 'FAILED' ? 'red' : 'yellow'
      return <Badge variant={color}>{status}</Badge>
    }
  },
  {
    accessorKey: 'scheduledAt',
    header: 'Scheduled At',
    cell: ({ row }) => <div>{formatDate(row.getValue('scheduledAt'))}</div>
  },
  {
    accessorKey: 'startedAt',
    header: 'Started At',
    cell: ({ row }) => <div>{formatDate(row.getValue('startedAt'))}</div>
  },
  {
    accessorKey: 'endedAt',
    header: 'Ended At',
    cell: ({ row }) => <div>{formatDate(row.getValue('endedAt'))}</div>
  }
]
