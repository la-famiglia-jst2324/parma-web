'use client'

import React, { useState } from 'react'
import { Frequency } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createNewDatasource } from '@/services/datasource/datasourceService'

interface CreateDatasourceProps {
  triggerButton?: React.ReactNode
  isOpen?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDatasource: React.FC<CreateDatasourceProps> = ({ triggerButton, isOpen, setOpen }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const { toast } = useToast()
  const regex = /^[a-z0-9_-]+$/

  async function createDatasource(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
    description: string,
    url: string,
    frequency: string
  ) {
    event.preventDefault()

    if (frequency === null || frequency === '') {
      toast({
        title: 'Frequency is required',
        description: 'Please select a frequency for the datasource',
        duration: 5000
      })
      return
    }

    if (name === null || name === '') {
      toast({
        title: 'Name is required',
        description: 'Please provide a name for the datasource',
        duration: 5000
      })
      return
    }

    if (!regex.test(name)) {
      toast({
        title: 'Invalid name format.',
        description: 'Name is required and should only contain lowercase letters, numbers, underscores, and hyphens.',
        duration: 5000
      })
      return
    }

    if (url === null || url === '') {
      toast({
        title: 'URL is required',
        description: 'Please provide a URL for the datasource',
        duration: 5000
      })
      return
    }

    const frequencyEnum = Frequency[frequency as keyof typeof Frequency]

    const dataSource = {
      sourceName: name,
      isActive: true,
      frequency: frequencyEnum,
      healthStatus: 'UP',
      modifiedAt: new Date().toISOString(),
      invocationEndpoint: url,
      description
    }
    try {
      const response = await createNewDatasource(dataSource)

      if (response.ok) {
        toast({
          title: 'Datasource created successfully',
          description: 'New datasource has been created successfully',
          duration: 5000
        })
      }
    } catch (error) {
      console.error('Error creating datasource:', error)
      toast({
        title: 'Datasource creation failed',
        description: 'Failed to create new datasource',
        duration: 5000
      })
    }
  }
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Datasource</DialogTitle>
            <DialogDescription>Please fill the following information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1">
              <Input
                id="name"
                placeholder="Name"
                value={name}
                onChange={(event) => handleInputChange(event, setName)}
              />
            </div>
            <div className="space-y-1">
              <Textarea
                id="description"
                value={description}
                placeholder="Description"
                onChange={(event) => handleInputChange(event, setDescription)}
              />
            </div>
            <div className="space-y-1">
              <Input id="url" value={url} onChange={(event) => handleInputChange(event, setUrl)} placeholder="URL" />
            </div>
            <div className="space-y-1">
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Frequency" />
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
            <Button variant="secondary" onClick={(event) => createDatasource(event, name, description, url, frequency)}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateDatasource
