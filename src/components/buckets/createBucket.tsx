'use client'

import type { Bucket, Company } from '@prisma/client'
import { useState } from 'react'
import { MultiSelect } from '../ui/multi-select'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { ShowToast } from '../ShowToast'
import BucketFunctions from '@/app/services/bucket.service'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CreateBucketProps {
  triggerButton?: React.ReactNode
  isOpen?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBucket: React.FC<CreateBucketProps> = ({ triggerButton, isOpen, setOpen }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [allCompaniesPaginated, setCompaniesPaginated] = useState([])

  const createBucket = async () => {
    const bucket = {
      title,
      isPublic,
      description
    }
    if (title === null || title === '') {
      ShowToast('Title is required', 'Please provide a title for the bucket', 'destructive')
    } else if (selectedCompanies.length === 0) {
      ShowToast('Companies are required', 'Please select companies for the bucket', 'destructive')
    } else {
      BucketFunctions.createBucket(bucket)
        .then((data: Bucket) => {
          // Add companies to the bucket

          if (selectedCompanies.length > 0) {
            const updatedCompanies = selectedCompanies.map((c) => {
              return { bucketId: data.id + '', companyId: c }
            })
            BucketFunctions.addCompaniesToBucket(updatedCompanies)
              .then((data) => console.log(data))
              .catch((e) => console.log(e))
          }
          ShowToast('Success', 'Bucket created successfully')
        })
        .catch((error) => {
          ShowToast('Error', 'Failed to create bucket', 'destructive')
          console.error('Error:', error)
        })
    }
  }

  const getCompanies = () => {
    BucketFunctions.getAllCompanies()
      .then(setCompaniesPaginated)
      .catch((error) => {
        console.error('Failed to fetch companies:', error)
      })
  }

  const handleSwitchChange = (value: boolean) => {
    setIsPublic(value)
  }

  const data = allCompaniesPaginated?.map((company: Company) => {
    return {
      value: String(company?.id),
      label: company?.name
    }
  })
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={getCompanies}>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="m-2 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Bucket</DialogTitle>
          <DialogDescription>Please fill in the details below to create a new bucket.</DialogDescription>
        </DialogHeader>
        <div className="max-w-[465px] p-2" role="main">
          <div className="w-full rounded-lg border-0 shadow-md">
            <form role="form" data-testid="create-bucket-form">
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Software companies"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="description"> Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="New software companies in the market"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="mb-2 block text-sm font-bold ">Companies</label>
                <MultiSelect
                  options={data}
                  selected={selectedCompanies}
                  onChange={(e) => setSelectedCompanies(e || [])}
                  placeholder="Select Companies"
                  width="w-80"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Checkbox id="switch" name="isPublic" checked={isPublic} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="switch">Make this bucket publicly available</Label>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="mt-2" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="mt-2" variant="secondary" onClick={createBucket}>
              <div className="flex items-center gap-0.5 ">Create</div>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBucket
