'use client'
import { useContext, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

import { ShowToast } from '../ShowToast'
import { SideBarContext } from '../SidebarContext'
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
  const { setCompanies } = useContext(SideBarContext)

  const [createCompaniesBlocked, setCreateCompaniesBlocked] = useState<boolean>(false)

  const handleCompanyCreation = async () => {
    setCreateCompaniesBlocked(true)

    if (!title) {
      ShowToast('Error', 'Please enter a company name', 'destructive')
      setCreateCompaniesBlocked(false)
      return
    }
    try {
      if (title !== '') {
        const data = await postCompany(title, description)
        setCompanies((prev) => [...prev, data])
        ShowToast('Success', 'Company created successfully')
        if (setOpen) {
          setOpen(false)
        }
      } else {
        ShowToast('Title is required', 'Please provide a title for the company', 'destructive')
      }
    } catch (error) {
      ShowToast('Error', 'Failed to create company', 'destructive')
    } finally {
      setCreateCompaniesBlocked(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
          <DialogDescription>Please fill in the details below to create a new company</DialogDescription>
        </DialogHeader>
        <div className="max-w-[465px] " role="main">
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="secondary" onClick={handleCompanyCreation} disabled={createCompaniesBlocked}>
            {createCompaniesBlocked && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCompanyModal
