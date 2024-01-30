'use client'

import { useState } from 'react'
import { PencilIcon } from 'lucide-react'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { ShowToast } from '../ShowToast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface EditBucketModalProps {
  title: string
  description: string | null
  isPublic: boolean
  handleSave: (title: string, description: string | null, isPublic: boolean) => void
}

const EditBucketModal: React.FC<EditBucketModalProps> = ({
  title: titleProp,
  description: descriptionProp,
  isPublic: isPublicProp,
  handleSave
}) => {
  const [title, setTitle] = useState(titleProp)
  const [description, setDescription] = useState(descriptionProp)
  const [isPublic, setIsPublic] = useState(isPublicProp)

  const handleSaveClick = () => {
    if (title === null || title === '') {
      ShowToast('Title is required', 'Title cannot be empty', 'destructive')
    } else {
      handleSave(title, description, isPublic)
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mr-2 flex items-center" variant="outline" color="gray">
            <PencilIcon className=" h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Bucket</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Edit the bucket information here</DialogDescription>
          </DialogHeader>
          <div>
            <div className="mb-8">
              <div className="grid w-full max-w-sm  gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  placeholder="Please enter bucket title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  value={title}
                />
              </div>
            </div>
            <div className="mb-8">
              <div className="grid w-full max-w-sm  gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  placeholder="Please enter bucket description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  value={description || undefined}
                />
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <Checkbox
                id="isPublic"
                name="isPublic"
                checked={isPublic}
                onCheckedChange={(val) => {
                  if (val === 'indeterminate') {
                    setIsPublic(false)
                  } else {
                    setIsPublic(val)
                  }
                }}
              />
              <p className="text-sm text-slate-300">Make this bucket publicly available</p>
            </div>
          </div>
          <DialogFooter>
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
    </div>
  )
}
export default EditBucketModal
