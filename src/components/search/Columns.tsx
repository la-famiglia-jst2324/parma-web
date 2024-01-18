import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type SearchItem = {
  id: number
  name: string
  description: string
  type: string
  // subscribed: boolean
}

export const columns: ColumnDef<SearchItem>[] = [
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
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <div className="flex items-center">
          <Badge>{type}</Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Description'
  }
  // {
  //     accessorKey: 'subscribed',
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //         const amount = parseFloat(row.getValue("amount"))
  //         const formatted = new Intl.NumberFormat("en-US", {
  //             style: "currency",
  //             currency: "USD",
  //         }).format(amount)

  //         return <div className="text-right font-medium">{formatted}</div>
  //     },
  // },
]
