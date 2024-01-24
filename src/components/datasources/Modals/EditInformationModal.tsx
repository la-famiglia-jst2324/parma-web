import React, { useState } from 'react'
import { PencilIcon } from 'lucide-react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface EditInformationModalProps {
  sourceName: string
  description: string
  url: string
  frequency: string
  handleSave: (updates: { newName: string; newDescription: string; newUrl: string }) => Promise<void>
}

const EditInformationModal: React.FC<EditInformationModalProps> = ({
  sourceName: nameProp,
  description: descriptionProp,
  url: urlProp,
  frequency: frequencyProp,
  handleSave
}) => {
  const [sourceName, setName] = useState(nameProp)
  const [description, setDescription] = useState(descriptionProp)
  const [url, setUrl] = useState(urlProp)
  const [frequency, setFrequency] = useState(frequencyProp)

  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: React.ChangeEvent<T>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  const handleSaveClick = () => {
    handleSave({
      newName: sourceName,
      newDescription: description,
      newUrl: url
    }).catch((error) => {
      console.error('An error occurred:', error)
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Datasource</DialogTitle>
            <DialogDescription>Edit the datasource information below</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1">
              <label htmlFor="sourceName">Name</label>
              <Input
                id="sourceName"
                value={sourceName}
                placeholder="Name"
                onChange={(event) => handleInputChange(event, setName)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                value={description}
                placeholder="Description"
                onChange={(event) => handleInputChange(event, setDescription)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="url">URL</label>
              <Input id="url" value={url} onChange={(event) => handleInputChange(event, setUrl)} placeholder="URL" />
            </div>
            <div className="space-y-1">
              <label htmlFor="frequency">Frequency</label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the datasource frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="HOURLY">Hourly</SelectItem>
                    <SelectItem value="DAILY">Daily</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
    </>
  )
}

export default EditInformationModal
