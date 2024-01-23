import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, WifiIcon, WifiOff } from 'lucide-react'
import type { DataSource } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<DataSource>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('id')}</div>
  },
  {
    accessorKey: 'sourceName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="w-36">{row.getValue('sourceName')}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center justify-center"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      const status = isActive ? 'Active' : 'Inactive'
      return (
        <div className="w-10">
          <Badge
            className={`${
              isActive ? 'bg-blue-700 text-blue-100 hover:bg-blue-800' : 'bg-red-700 text-red-100 hover:bg-red-800'
            } flex h-6 w-24 items-center justify-center`}
          >
            {isActive ? <WifiIcon className="mr-2 h-4 w-4" /> : <WifiOff className="mr-2 h-4 w-4" />}
            {status}
          </Badge>
        </div>
      )
    }
  }
]
