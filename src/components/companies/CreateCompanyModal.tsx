'use client'
import { useState } from 'react'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useToast } from '../ui/use-toast'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { postCompany } from '@/services/company/companyService'

interface CreateCompanyProps {
  triggerButton?: React.ReactNode
  isOpen?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCompanyModal: React.FC<CreateCompanyProps> = ({ triggerButton, isOpen, setOpen }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { toast } = useToast()

  const handleCompanyCreation = async () => {
    try {
      await postCompany(title, description)
      toast({
        title: 'Success',
        description: 'Company created successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create company',
        variant: 'destructive'
      })
      console.error('Error:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="m-2 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>Please fill in the details below to create a new company</DialogDescription>
        </DialogHeader>
        <div className="max-w-[465px] p-2" role="main">
          <div className="w-full rounded-lg border-0 shadow-md">
            <form role="form" data-testid="create-bucket-form">
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="title">Name</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Parma AI"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Parma AI provides day to day information about recent trends in the market."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-2" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant="secondary" className="mt-2" onClick={handleCompanyCreation}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCompanyModal
