import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Button } from '@/components/ui/button'

interface Measurement {
  metricName: string
  value: number
  date: string | Date
}

interface CompanyMeasurement {
  companyId: string
  companyName: string
  measurements: Measurement[]
}

export const columns: ColumnDef<CompanyMeasurement>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'companyId',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('companyId')}</div>
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="w-36">{row.getValue('companyName')}</div>
  },
  {
    accessorKey: 'metricName',
    header: '# of Employees',
    cell: ({ row }) => {
      if (row.original.measurements[0]?.value) {
        return <div>{row.original.measurements[0]?.value.toFixed(2)}</div>
      } else {
        return <div></div>
      }
    }
  },
  {
    accessorKey: 'metricNameTwo',
    header: 'Monthly Revenue',
    cell: ({ row }) => {
      if (row.original.measurements[1]?.value) {
        return <div>€{row.original.measurements[1]?.value.toFixed(2)}</div>
      } else {
        return <div></div>
      }
    }
  }
]
