import React from 'react'
import type { CompanyDataSourceIdentifier } from '@prisma/client'
import { TableRow, TableCell } from '../../ui/table'
import { Button } from '@/components/ui/button'

interface IdentifierRowProps {
  identifier: CompanyDataSourceIdentifier
  deleteIdentifier: () => void
}

const IdentifierRow: React.FC<IdentifierRowProps> = ({ identifier, deleteIdentifier }) => {
  return (
    <TableRow>
      <TableCell>{identifier.property}</TableCell>
      <TableCell>{identifier.value}</TableCell>
      <TableCell>{new Date(identifier.validity).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button variant="destructive" color="secondary" onClick={deleteIdentifier}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default IdentifierRow
