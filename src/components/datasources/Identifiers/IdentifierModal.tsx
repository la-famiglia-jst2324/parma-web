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
import { useToast } from '../../ui/use-toast'
import IdentifierRow from './IdentifierRow'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  deleteCompanyDataSourceIdentifierById as deleteIdentifierById,
  getCompanyDataSourceIdentifiers,
  createCompanyDataSourceIdentifier
} from '@/services/datasource/datasourceService'
import { Input } from '@/components/ui/input'
import { getCompanyDataSourceId } from '@/services/company/companyService'

interface IdentifierModalProps {
  companyId: string
  datasourceId: string
}

export const IdentifierModal: React.FC<IdentifierModalProps> = ({ companyId, datasourceId }) => {
  const [companyDatasourceId, setCompanyDatasourceId] = useState('')
  const [identifiers, setIdentifiers] = useState<CompanyDataSourceIdentifier[]>([])
  const [identifierKey] = useState('')
  const [property, setProperty] = useState('')
  const [value, setValue] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyDataSourceId(datasourceId, companyId)
        setCompanyDatasourceId(data[0].id)

        const identifierData = await getCompanyDataSourceIdentifiers(data[0].id)
        setIdentifiers(identifierData)
      } catch (error) {
        console.error('Failed to fetch identifiers:', error)
      }
    }

    fetchData()
  }, [companyId, datasourceId])

  async function deleteIdentifier(index: number) {
    try {
      const response = await deleteIdentifierById(identifiers[index].id.toString())

      console.log(response)

      if (response.message === 'Identifier deleted successfully') {
        setIdentifiers(identifiers.filter((_, i) => i !== index))
        toast({
          title: 'Identifier deleted successfully',
          description: 'You have successfully deleted an identifier'
        })
      } else {
        toast({
          title: 'Failed to delete identifier',
          description: 'An error occurred while trying to delete the identifier'
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error occurred',
        description: 'An error occurred while deleting the identifier'
      })
    }
  }

  async function addIdentifier(identifierKey: string, property: string, value: string) {
    const newIdentifier = {
      companyDataSourceId: parseInt(companyDatasourceId),
      identifierKey,
      identifierType: IdentifierType.MANUALLY_ADDED,
      property,
      value,
      validity: new Date().toISOString()
    }

    try {
      const createdIdentifier = await createCompanyDataSourceIdentifier(newIdentifier)
      setIdentifiers(identifiers ? [...identifiers, createdIdentifier] : [createdIdentifier])
      toast({
        title: 'Identifier added successfully',
        description: 'You have successfully added an identifier'
      })
    } catch (error) {
      console.error('Failed to add identifier', error)
      toast({
        title: 'Failed to add identifier',
        description: 'An error occurred while trying to add the identifier'
      })
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
          <Button type="button" onClick={() => addIdentifier(identifierKey, property, value)}>
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
