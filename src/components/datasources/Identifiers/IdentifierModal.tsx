import React, { useState, useEffect } from 'react'
import type { CompanyDataSourceIdentifier } from '@prisma/client'
import { IdentifierType } from '@prisma/client'
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import IdentifierRow from './IdentifierRow'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  deleteCompanyDataSourceIdentifierById as deleteIdentifierById,
  getCompanyDataSourceIdentifiers,
  createCompanyDataSourceIdentifier
} from '@/services/datasource/datasourceService'
import { Input } from '@/components/ui/input'
import { getCompanyDataSourceId } from '@/services/company/companyService'
import { ShowToast } from '@/components/ShowToast'

interface IdentifierModalProps {
  companyId: string
  datasourceId: string
}

export const IdentifierModal: React.FC<IdentifierModalProps> = ({ companyId, datasourceId }) => {
  const [companyDatasourceId, setCompanyDatasourceId] = useState('')
  const [identifiers, setIdentifiers] = useState<CompanyDataSourceIdentifier[]>([])
  const [property, setProperty] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyDataSourceId(datasourceId, companyId)
        setCompanyDatasourceId(data[0].id)

        const identifierData = await getCompanyDataSourceIdentifiers(data[0].id)

        if (!identifierData || identifierData.message === 'There is no identifier with the id you provide') {
          console.log('No identifiers found')
          setIdentifiers([])
        } else {
          setIdentifiers(identifierData)
        }
      } catch (error) {
        console.log('Failed to fetch identifiers:')
      }
    }

    fetchData()
  }, [companyId, datasourceId])

  async function deleteIdentifier(index: number) {
    try {
      const response = await deleteIdentifierById(identifiers[index].id.toString())
      if (response.message === 'Identifier deleted successfully') {
        setIdentifiers(identifiers.filter((_, i) => i !== index))
        ShowToast('Success', 'Identifier deleted successfully')
      } else {
        ShowToast('Failed', 'An error occurred while trying to delete the identifier')
      }
    } catch (error) {
      console.error(error)
      ShowToast('Failed', 'An error occurred while trying to delete the identifier')
    }
  }

  async function addIdentifier(property: string, value: string) {
    const validityDate = new Date()
    validityDate.setMonth(validityDate.getMonth() + 6)

    const newIdentifier = {
      companyDataSourceId: parseInt(companyDatasourceId),
      identifierType: IdentifierType.MANUALLY_ADDED,
      property,
      value,
      validity: validityDate.toISOString()
    }

    try {
      const createdIdentifier = await createCompanyDataSourceIdentifier(newIdentifier)
      setIdentifiers(identifiers ? [...identifiers, createdIdentifier] : [createdIdentifier])
      ShowToast('Success', 'Identifier added successfully')
    } catch (error) {
      console.error('Failed to add identifier', error)
      ShowToast('Failed', 'An error occurred while trying to add the identifier')
    }
  }

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Configure</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Configure Identifiers</DialogTitle>
          <DialogDescription>You can add, edit or remove identifiers. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identifiers &&
                identifiers
                  .filter(Boolean)
                  .map((identifier, index) => (
                    <IdentifierRow
                      key={identifier.id}
                      identifier={identifier}
                      deleteIdentifier={() => deleteIdentifier(index)}
                    />
                  ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Input value={property} onChange={handleInputChange(setProperty)} placeholder="Property" />
          <Input value={value} onChange={handleInputChange(setValue)} placeholder="Value" />
          <Button type="button" onClick={() => addIdentifier(property, value)}>
            Add Identifier
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
