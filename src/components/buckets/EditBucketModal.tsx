'use client'

import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
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
import { Switch } from '@/components/ui/switch'

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
    handleSave(title, description, isPublic)
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mr-2 flex items-center border-gray-500" variant="outline" color="gray">
            Edit bucket information
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit bucket</DialogTitle>
          </DialogHeader>
          <div>
            <div className="mb-8">
              <div className="grid w-full max-w-sm  gap-1.5">
                <Label htmlFor="title">Bucket Title</Label>
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
                <Label htmlFor="description">Bucket description</Label>
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
            <div className="mb-8 flex items-center gap-4">
              <Label htmlFor="isPublic">Is public</Label>
              <Switch id="isPublic" name="isPublic" checked={isPublic} onCheckedChange={(val) => setIsPublic(val)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleSaveClick}>Save</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default EditBucketModal
