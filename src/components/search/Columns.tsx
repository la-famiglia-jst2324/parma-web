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
    cell: ({ row }) => <div className="w-10 capitalize">{row.getValue('id')}</div>
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
    },
    cell: ({ row }) => <div className="w-36">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="w-96">{row.getValue('description')}</div>
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
      const formattedType = type.charAt(0).toUpperCase() + type.slice(1)
      const badgeColor = type === 'bucket' ? 'blue' : 'green'
      return (
        <div className="w-10">
          <Badge variant={badgeColor} className="flex h-6 w-20 items-center justify-center">
            {formattedType}
          </Badge>
        </div>
      )
    }
  }
]
