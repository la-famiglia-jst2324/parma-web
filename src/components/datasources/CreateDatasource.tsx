'use client'

import React, { useState } from 'react'
import { Frequency } from '@prisma/client'
import type { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { Label } from '../ui/label'
import { ShowToast } from '../ShowToast'
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

interface ErrorResponse {
  error: string
}

interface CreateDatasourceProps {
  triggerButton?: React.ReactNode
  isOpen?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  onDatasourceCreated?: () => void
}

const CreateDatasource: React.FC<CreateDatasourceProps> = ({ triggerButton, isOpen, setOpen, onDatasourceCreated }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const regex = /^[a-z0-9_-]+$/

  const [createDataSourceBlocked, setCreateDataSourceBlocked] = useState<boolean>(false)

  async function createDatasource() {
    try {
      setCreateDataSourceBlocked(true)

      if (frequency === null || frequency === '') {
        ShowToast('Frequency is required', 'Please select a frequency for the datasource', 'destructive')
        setCreateDataSourceBlocked(false)
        return
      }

      if (name === null || name === '') {
        ShowToast('Name is required', 'Please provide a name for the datasource', 'destructive')
        setCreateDataSourceBlocked(false)
        return
      }

      if (!regex.test(name)) {
        ShowToast(
          'Invalid name format.',
          'Name is required and should only contain lowercase letters, numbers, underscores, and hyphens.',
          'destructive'
        )
        setCreateDataSourceBlocked(false)
        return
      }

      if (url === null || url === '') {
        ShowToast('URL is required', 'Please provide a URL for the datasource', 'destructive')
        setCreateDataSourceBlocked(false)
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

      const response = await createNewDatasource(dataSource)

      if (response.id) {
        ShowToast('Success', 'Datasource created successfully')
        if (setOpen) {
          setOpen(false)
        }
      }

      if (onDatasourceCreated) {
        onDatasourceCreated()
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred'
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const errorResponse = axiosError?.response?.data as ErrorResponse
        errorMessage = errorResponse?.error || errorMessage
      }
      ShowToast('Datasource creation failed', errorMessage, 'destructive')
    } finally {
      setCreateDataSourceBlocked(false)
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
            <DialogTitle>Create Datasource</DialogTitle>
            <DialogDescription>Please fill the following information to create a new datasource</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1">
              <Label htmlFor="title">Name</Label>
              <Input
                id="name"
                placeholder="Parma AI"
                value={name}
                onChange={(event) => handleInputChange(event, setName)}
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                id="description"
                placeholder="Parma AI provides day to day information about recent trends in the market."
                value={description}
                onChange={(event) => handleInputChange(event, setDescription)}
              />
            </div>
            <div className="space-y-1">
              <Label>URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(event) => handleInputChange(event, setUrl)}
                placeholder="https://parma.software"
              />
            </div>
            <div className="space-y-1">
              <Label>Frequency</Label>

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
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="secondary" onClick={createDatasource} disabled={createDataSourceBlocked}>
              {createDataSourceBlocked && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateDatasource
