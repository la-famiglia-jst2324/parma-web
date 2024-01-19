import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type SearchItem = {
  id: number
  name: string
  description: string
  type: string
}

export const columns: ColumnDef<SearchItem>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center justify-center"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <div className="">
          <Badge>{type}</Badge>
        </div>
      )
    }
  }
]
