import React, { useState, useEffect } from 'react'
import { PencilIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface EditCompanyModalProps {
  companyName: string
  companyDescription: string
  handleSave: (name: string, description: string) => Promise<void>
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ companyName, companyDescription, handleSave }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(companyName)
    setDescription(companyDescription)
  }, [companyName, companyDescription])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  const handleSaveClick = () => {
    handleSave(name, description).catch((error) => {
      console.error('An error occurred:', error)
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
          <DialogDescription>Edit the company information here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-left">Name</Label>
            <Input id="name" value={name} onChange={(event) => handleInputChange(event, setName)} />
          </div>
          <div className="space-y-1">
            <Label className="text-left">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => handleInputChange(event, setDescription)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="secondary" onClick={handleSaveClick}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCompanyModal
