'use client'
import { Plus } from 'lucide-react'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import type { Bucket, Company } from '@prisma/client'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { useState } from 'react'
import { DialogHeader, DialogFooter } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { useToast } from '../ui/use-toast'
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

const CreateBucket = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [allCompaniesPaginated, setCompaniesPaginated] = useState([])

  const { toast } = useToast()

  const createBucket = async () => {
    const bucket = {
      title,
      isPublic,
      description
    }

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
        toast({
          title: 'Success',
          description: 'Bucket created successfully'
        })
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: 'Failed to create bucket',
          variant: 'destructive'
        })
        console.error('Error:', error)
      })
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

  return (
    <Dialog>
      <DialogTrigger asChild onClick={getCompanies}>
        {/* <Button className="mr-2 flex items-center gap-2 border-blue-600 bg-transparent text-blue-600" variant="outline"> */}
        <Plus className="cursor-pointer" />
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="m-2 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create bucket</DialogTitle>
          <DialogDescription>
            You can create a collection of companies here. Please choose companies from a list of available companies.
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-[465px] p-2" role="main">
          <div className="w-full rounded-lg border-0 shadow-md">
            <form role="form" data-testid="create-bucket-form">
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="title">Bucket title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please enter bucket title"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <Label htmlFor="description">Bucket description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Please enter bucket description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="mb-2 block text-sm font-bold ">Companies</label>
                <MultiSelect onValueChange={(e) => setSelectedCompanies(e || [])}>
                  {allCompaniesPaginated?.map((company: Company) => (
                    <MultiSelectItem key={company.id} value={`${company.id}`}>
                      {company.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <Label htmlFor="switch">Make this bucket public</Label>
                <Switch id="switch" name="isPublic" checked={isPublic} onCheckedChange={handleSwitchChange} />
              </div>
            </form>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="mt-2" onClick={createBucket}>
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5"></CheckBadgeIcon>
                <div className="flex items-center gap-0.5 ">Create new Bucket</div>
              </div>
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="submit" className="mt-2" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBucket
