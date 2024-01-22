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
  createCompanyDataSourceIdentifier,
  editCompanyDataSourceIdentifier
} from '@/services/datasource/datasourceService'
import { Input } from '@/components/ui/input'

interface IdentifierModalProps {
  dataSourceId: string
}

export const IdentifierModal: React.FC<IdentifierModalProps> = ({ dataSourceId }) => {
  const [identifiers, setIdentifiers] = useState<CompanyDataSourceIdentifier[]>([])
  const [identifierKey, setIdentifierKey] = useState('')
  const [property, setProperty] = useState('')
  const [value, setValue] = useState('')

  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyDataSourceIdentifiers(dataSourceId)
        setIdentifiers(data.data)
      } catch (error) {
        console.error('Failed to fetch identifiers:', error)
      }
    }

    fetchData()
  }, [])

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
      companyDataSourceId: parseInt(dataSourceId),
      identifierKey,
      identifierType: IdentifierType.MANUALLY_ADDED,
      property,
      value,
      validity: new Date().toISOString()
    }

    try {
      const createdIdentifier = await createCompanyDataSourceIdentifier(newIdentifier)
      setIdentifiers([...identifiers, createdIdentifier])
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

  async function updateIdentifier(updatedIdentifier: CompanyDataSourceIdentifier) {
    try {
      const updatedIdentifierFromServer = await editCompanyDataSourceIdentifier(updatedIdentifier)
      setIdentifiers(
        identifiers.map((identifier) =>
          identifier.id === updatedIdentifierFromServer.id ? updatedIdentifierFromServer : identifier
        )
      )
      toast({
        title: 'Identifier updated successfully',
        description: 'You have successfully updated an identifier'
      })
    } catch (error) {
      console.error('Failed to update identifier', error)
      toast({
        title: 'Failed to update identifier',
        description: 'An error occurred while trying to update the identifier'
      })
    }
  }

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value)
    }

  // const handleSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();

  //     try {
  //         await Promise.all(identifiers.map((identifier) =>
  //             identifier.id ? updateIdentifier(identifier) : null
  //         ));
  //         if (identifierKey && property && value) {
  //             await addIdentifier(identifierKey, property, value);
  //             setIdentifierKey('');
  //             setProperty('');
  //             setValue('');
  //         }
  //         // close the modal or show a success message
  //     } catch (error) {
  //         // handle the error
  //     }
  // };

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
                <TableHead>Identifier Key</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identifiers &&
                identifiers.map((identifier, index) => (
                  <IdentifierRow
                    key={identifier.id}
                    identifier={identifier}
                    setIdentifier={(updatedIdentifier: CompanyDataSourceIdentifier) =>
                      updateIdentifier(updatedIdentifier)
                    }
                    deleteIdentifier={() => deleteIdentifier(index)}
                  />
                ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Input value={identifierKey} onChange={handleInputChange(setIdentifierKey)} placeholder="Identifier Key" />
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
