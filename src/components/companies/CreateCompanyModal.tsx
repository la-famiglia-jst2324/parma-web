'use client'
import { CheckCircle2 } from 'lucide-react'
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
  triggerButton: React.ReactNode
  onClose: () => void
}

const CreateCompanyModal: React.FC<CreateCompanyProps> = ({ triggerButton, onClose }) => {
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
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="m-2 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>
            You can create a new company here. Please choose the company name and description
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-[465px] p-2" role="main">
          <div className="w-full rounded-lg border-0 shadow-md">
            <form role="form" data-testid="create-bucket-form">
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="title">Company Name</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please enter company name"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="description">Company description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Please enter company description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="mt-2" onClick={handleCompanyCreation}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5"></CheckCircle2>
                <div className="flex items-center gap-0.5 ">Create new Company</div>
              </div>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onClose} type="submit" className="mt-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCompanyModal
